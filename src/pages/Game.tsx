import { Component, ReactElement } from "react";
import {
    Board as BoardComponent,
    BottomBar,
    Cell,
    CellType,
    GameOverModal,
    TopBar,
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

interface Cells {
    [key: string]: ReactElement;
}

interface State {
    inProgress: boolean;
    showGameOverModal: boolean;
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
            inProgress: false,
            showGameOverModal: false,
            cells: cells,
        };

        this.handleStartGame = this.handleStartGame.bind(this);
    }

    componentDidMount() {
        getSettings().then((settings) => {
            this.settings = settings;
            this.audioPlayer.isEnabled = this.settings.audioEnabled;
            this.audioPlayer.init();
        });

        document.addEventListener("keydown", (keyboardEvent) => {
            if (!this.state.inProgress) {
                return;
            }

            inputHandler.setNextDirection(
                Direction.fromKey(keyboardEvent.key),
                this.board.snake?.direction || Direction.None
            );
        });
    }

    render() {
        return (
            <>
                <GameOverModal
                    show={this.state.showGameOverModal}
                    score={this.board.snake?.pelletsEaten || 0}
                    handleClose={() => this.handleGameOver()}
                />
                <TopBar
                    showTimer={this.state.inProgress}
                    score={this.board.snake?.pelletsEaten}
                    spinLogo={this.state.inProgress}
                />
                <BoardComponent size={this.boardSize}>
                    {Object.values(this.state.cells)}
                </BoardComponent>
                <BottomBar handleStartGame={this.handleStartGame}></BottomBar>
            </>
        );
    }

    private async handleStartGame() {
        this.setState({ inProgress: true });
        this.board.spawnSnake(this.settings.wrapEnabled);
        this.board.spawnPellet();

        do {
            this.updateCellsInState();
            await sleep(80);
            this.board.moveSnake(inputHandler.nextDirection);
        } while (!this.board.isInIllegalState);

        document.dispatchEvent(
            new CustomEvent("PlayAudio", { detail: Sound.GameOver })
        );

        this.setState({ inProgress: false, showGameOverModal: true });
    }

    private updateCellsInState() {
        let cells = { ...this.emptyCells };
        const pellet = this.board.pellet!.point.toString();

        this.board.snake!.points.forEach(
            (p) =>
                (cells[p.toString()] = this.createCell(p.toString(), "Snake"))
        );

        cells[pellet] = this.createCell(pellet, "Pellet");
        this.setState({ cells });
    }

    private async handleGameOver() {
        const score = this.board.snake!.pelletsEaten;
        const playerName = await getPlayerName();

        if (playerName && (await isNewHighScore(score))) {
            await addHighScore(playerName, score);
        }

        this.board.reset();

        this.setState({
            cells: { ...this.emptyCells },
            showGameOverModal: false,
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
