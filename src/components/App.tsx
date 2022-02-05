import inputHandler from "../logic/intput-handler";
import { AudioPlayer, Board, Direction, Point, Sound } from "../logic";
import { Component, Profiler, ReactElement } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
    Board as BoardComponent,
    Cell,
    CellType,
    GameOverModal,
    SettingsModal,
    Title,
    TopBar,
    Settings,
} from ".";
import { BottomBar } from "./BottomBar/BottomBar";

interface Cells {
    [key: string]: ReactElement;
}

interface State {
    inProgress: boolean;
    showGameOverModal: boolean;
    showSettings: boolean;
    settings: Settings;
    cells: Cells;
}

export class App extends Component<{}, State> {
    private board: Board;
    private readonly audioPlayer: AudioPlayer = new AudioPlayer();
    private readonly emptyCells: Cells;
    private boardSize = 15;

    constructor(props: {}) {
        super(props);
        this.board = new Board(this.boardSize);
        const cells = this.createCells();

        this.emptyCells = cells;

        this.state = {
            inProgress: false,
            showGameOverModal: false,
            showSettings: false,
            settings: {
                wrapEnabled: false,
                audioEnabled: true,
            },
            cells: cells,
        };

        this.handleShowSettings = this.handleShowSettings.bind(this);
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", (keyboardEvent) => {
            if (!this.state.inProgress) {
                return;
            }

            inputHandler.setNextDirection(
                Direction.fromKey(keyboardEvent.key),
                this.board.snake?.direction || Direction.None
            );
        });

        this.audioPlayer.init();
    }

    render() {
        return (
            <>
                <GameOverModal
                    show={this.state.showGameOverModal}
                    score={this.board.snake?.pelletsEaten || 0}
                    handleClose={() => this.handleGameOver()}
                />
                <SettingsModal
                    show={this.state.showSettings}
                    settings={this.state.settings}
                    handleClose={() => this.setState({ showSettings: false })}
                    handleSettingsChange={this.handleSettingsChange}
                />
                <TopBar
                    showTimer={this.state.inProgress}
                    score={this.board.snake?.pelletsEaten}
                />
                <Row className="text-center">
                    <Col>
                        <Profiler
                            id="boardProfiler"
                            onRender={(...rest) =>
                                console.log(rest[1], rest[2])
                            }
                        >
                            <BoardComponent size={this.boardSize}>
                                {Object.values(this.state.cells)}
                            </BoardComponent>
                        </Profiler>
                    </Col>
                </Row>
                <BottomBar
                    handleShowSettings={this.handleShowSettings}
                    handleStartGame={this.handleStartGame}
                ></BottomBar>
            </>
        );
    }

    private async handleStartGame() {
        this.setState({ inProgress: true });
        this.board.spawnSnake(this.state.settings.wrapEnabled);
        this.board.spawnPellet();

        do {
            this.updateCellsInState();
            await sleep(90);
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

    private handleGameOver() {
        this.board.reset();

        this.setState({
            cells: { ...this.emptyCells },
            showGameOverModal: false,
        });
    }

    private handleShowSettings() {
        this.setState({ showSettings: true });
    }

    private handleSettingsChange(newSettings: Settings) {
        this.audioPlayer.isEnabled = newSettings.audioEnabled;

        this.setState({
            settings: {
                ...this.state.settings,
                ...newSettings,
            },
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

const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

export default App;
