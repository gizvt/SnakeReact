import { Component, ReactElement } from "react";
import {
    Board as BoardComponent,
    BottomBar,
    Cell,
    CellType,
    GameOverModal,
    TopBar,
    HighScoreToast,
} from "../components";
import {
    AudioPlayer,
    Board,
    Direction,
    Point,
    Sound,
    getSettings,
    defaultSettings,
    Settings,
    sleep,
    isNewHighScore,
    addHighScore,
    getPlayerName,
} from "../modules";
import inputHandler from "../modules/services/input-handler";

// TODO: check that not all of the components are rerendering on every game
// loop. The toast seems to, because state has changed in the parent maybe?

interface Cells {
    [key: string]: ReactElement;
}

interface State {
    status: "Idle" | "InProgress" | "Paused";
    showGameOverModal: boolean;
    showHighScoreToast: boolean;
    score: number;
    cells: Cells;
}

export class Game extends Component<{}, State> {
    private board: Board;
    private readonly audioPlayer: AudioPlayer;
    private settings: Settings = defaultSettings;
    private readonly emptyCells: Cells;
    private boardSize = 15;

    constructor(props: {}) {
        super(props);
        this.board = new Board(this.boardSize);
        this.audioPlayer = new AudioPlayer();
        const cells = this.createCells();

        this.emptyCells = cells;

        this.state = {
            status: "Idle",
            showGameOverModal: false,
            showHighScoreToast: false,
            score: 0,
            cells: cells,
        };

        this.handleGameOver = this.handleGameOver.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleHighScoreToastClose =
            this.handleHighScoreToastClose.bind(this);
    }

    componentDidMount() {
        getSettings().then((settings) => {
            this.settings = settings;
            this.audioPlayer.isEnabled = this.settings.audioEnabled;
            this.audioPlayer.init();
        });

        document.addEventListener("keydown", (keyboardEvent) => {
            if (this.state.status === "Idle") {
                return;
            }

            if (keyboardEvent.key === " ") {
                // Game is either in progress or paused. Toggle pause.
                this.setState({
                    status:
                        this.state.status === "InProgress"
                            ? "Paused"
                            : "InProgress",
                });
            } else if (this.state.status === "InProgress") {
                // Only listen to inputs if the game is in progress.
                inputHandler.setNextDirection(
                    Direction.fromKey(keyboardEvent.key),
                    this.board.snake?.direction || Direction.None
                );
            }
        });
    }

    render() {
        return (
            <>
                <GameOverModal
                    show={this.state.showGameOverModal}
                    score={this.state.score}
                    handleClose={this.handleGameOver}
                />
                <HighScoreToast
                    show={this.state.showHighScoreToast}
                    score={this.state.score}
                    handleClose={this.handleHighScoreToastClose}
                />
                <TopBar
                    showTimer={this.state.status === "InProgress"}
                    score={this.state.score}
                    spinLogo={this.state.status === "InProgress"}
                />
                <BoardComponent size={this.boardSize}>
                    {Object.values(this.state.cells)}
                </BoardComponent>
                <BottomBar handleStartGame={this.handleStartGame}></BottomBar>
            </>
        );
    }

    private handleHighScoreToastClose() {
        this.setState({ showHighScoreToast: false });
    }

    private async handleStartGame() {
        this.board.spawnSnake(this.settings.wrapEnabled);
        this.board.spawnPellet();
        const cells = this.getNewBoardState();

        // startGameLoop is passed as a callback so as to guarantee that status
        // has been updated to "InProgress" in state when the game loop starts.
        // The game loop needs to start checking this immediately to decide
        // whether or not the game is paused or not.
        this.setState(
            { cells, status: "InProgress" },
            async () => await this.startGameLoop()
        );
    }

    private async startGameLoop() {
        do {
            await sleep(80);

            if (this.state.status === "InProgress") {
                this.board.moveSnake(inputHandler.nextDirection);
                this.setState({
                    cells: this.getNewBoardState(),
                    score: this.board.snake!.pelletsEaten,
                });
            }
        } while (!this.board.isInIllegalState);

        document.dispatchEvent(
            new CustomEvent("PlayAudio", { detail: Sound.GameOver })
        );

        this.setState({
            status: "Idle",
            showGameOverModal: true,
        });
    }

    private getNewBoardState() {
        let cells = { ...this.emptyCells };
        const pellet = this.board.pellet!.point.toString();

        this.board.snake!.points.forEach(
            (p) =>
                (cells[p.toString()] = this.createCell(p.toString(), "Snake"))
        );

        cells[pellet] = this.createCell(pellet, "Pellet");
        return cells;
    }

    private async handleGameOver() {
        const score = this.board.snake!.pelletsEaten;
        const playerName = await getPlayerName();
        this.board.reset();

        if (playerName && (await isNewHighScore(score))) {
            await addHighScore(playerName, score);
            this.setState({ showHighScoreToast: true });
        }

        this.setState({
            cells: { ...this.emptyCells },
            showGameOverModal: false,
            score: score,
        });
    }

    private createCells() {
        const cells: Cells = {};

        for (let i = 0; i < this.board.area; i++) {
            const y = Math.floor(i / this.board.size);
            const x = i - y * this.board.size;
            const point = new Point(x, y).toString();
            cells[point] = this.createCell(point, "Empty");
        }

        return cells;
    }

    private createCell(coords: string, type: CellType) {
        return <Cell key={coords} type={type} />;
    }
}

export default Game;
