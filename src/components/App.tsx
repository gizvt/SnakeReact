import { Component, Profiler, ReactElement } from "react";
import { BoardComponent } from "./Board/Board";
import { Board } from "../logic/board";
import { Point } from "../logic/point";
import { Direction } from "../logic/direction";
import { Button, Col, Row } from "react-bootstrap";
import { Title } from "./Status/Title";
import { GameOverModal } from "./Modals/GameOverModal";
import { Score } from "./Status/Score";
import { SettingsModal } from "./Modals/SettingsModal";
import { AudioPlayer, Sound } from "../logic/audio-player";
import { Timer } from "./Status/Timer";
import { Cell, CellType } from "./Board/Cell";

interface Cells {
    [key: string]: ReactElement;
}

export interface Settings {
    wrapEnabled: boolean;
    audioEnabled: boolean;
}

interface Props {}

interface State {
    inProgress: boolean;
    showGameOverModal: boolean;
    showSettings: boolean;
    settings: Settings;
    cells: Cells;
}

export class App extends Component<Props, State> {
    private board: Board;
    private readonly inputQueue: Direction[] = [];
    private readonly audioPlayer: AudioPlayer = new AudioPlayer();
    private readonly emptyCells: Cells;
    private boardSize = 15;

    constructor(props: Props) {
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

        this.handleSettingsChange = this.handleSettingsChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", (keyboardEvent) => {
            if (!this.state.inProgress) {
                return;
            }

            this.nextDirection = Direction.fromKey(keyboardEvent.key);
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
                <Title />
                <Row className="text-center">
                    <Col>{this.state.inProgress && <Timer />}</Col>
                    <Col>
                        <Score score={this.board.snake?.pelletsEaten || 0} />
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <Profiler
                            id="asd"
                            onRender={(id, phase, actualDuration, ...rest) =>
                                console.log(phase, actualDuration)
                            }
                        >
                            <BoardComponent size={this.boardSize}>
                                {Object.values(this.state.cells)}
                            </BoardComponent>
                        </Profiler>
                    </Col>
                </Row>
                <Row className="mt-4 text-center">
                    <Col>
                        <Button
                            className="me-3"
                            variant="outline-primary"
                            onClick={() =>
                                this.setState({ showSettings: true })
                            }
                        >
                            Settings
                        </Button>
                        <Button onClick={async () => await this.startGame()}>
                            Start Game
                        </Button>
                    </Col>
                </Row>
            </>
        );
    }

    async startGame() {
        this.setState({ inProgress: true });
        this.board.spawnSnake(this.state.settings.wrapEnabled);
        this.board.spawnPellet();

        do {
            let cells = { ...this.emptyCells };
            const pellet = this.board.pellet!.point.toString();

            this.board.snake!.points.forEach(
                (p) =>
                    (cells[p.toString()] = this.createCell(
                        p.toString(),
                        "Snake"
                    ))
            );

            cells[pellet] = this.createCell(pellet, "Pellet");
            this.setState({ cells });
            await sleep(90);
            this.board.moveSnake(this.nextDirection);
        } while (!this.board.isInIllegalState);

        document.dispatchEvent(
            new CustomEvent("PlayAudio", { detail: Sound.GameOver })
        );

        this.setState({ inProgress: false, showGameOverModal: true });
    }

    private handleGameOver() {
        this.board.reset();

        this.setState({
            cells: { ...this.emptyCells },
            showGameOverModal: false,
        });
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

    get nextDirection() {
        const nextDirection = this.inputQueue.shift() || Direction.None;
        return nextDirection;
    }

    private set nextDirection(direction: Direction) {
        if (!Direction.AllDirections.includes(direction)) {
            // Don't add if the input direction doesn't exist.
            return;
        }

        // If there is no next direction...
        if (this.inputQueue.length === 0) {
            // ...don't record the input direction if it is opposite or equal to the snake's current direction.
            if (this.board.snake?.direction.isOppositeOrEqualTo(direction)) {
                return;
            }
            // Else if there IS a next direction...
        } else if (this.inputQueue.length > 0) {
            // ...don't record the input direction it if it is opposite or equal to the next direction.
            if (this.inputQueue[0].isOppositeOrEqualTo(direction)) {
                return;
            }
        }

        // Only maintain a buffer of two input directions at once.
        if (this.inputQueue.length === 2) {
            this.inputQueue.shift();
        }

        this.inputQueue.push(direction);
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
