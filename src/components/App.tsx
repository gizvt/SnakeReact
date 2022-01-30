import { Component } from "react";
import { BoardComponent } from "./Board/Board";
import { Board } from "../logic/board";
import { Point } from "../logic/point";
import { Direction } from "../logic/direction";
import { Button, Col, Row } from "react-bootstrap";
import { Title } from "./Title";
import { GameOverModal } from "./GameOverModal";
import { Score } from "./Score";

interface Props {}

interface State {
    inProgress: boolean;
    snakePoints: Point[] | null;
    pelletPoint: Point | null;
    showGameOverModal: boolean;
}

export class App extends Component<Props, State> {
    private gameOverAudio = new Audio("GameOver.ogg");
    private board: Board = new Board(15);
    private readonly inputQueue: Direction[] = [];

    constructor(props: Props) {
        super(props);
        this.state = {
            snakePoints: null,
            pelletPoint: null,
            inProgress: false,
            showGameOverModal: false,
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", (keyboardEvent) => {
            if (!this.state.inProgress) {
                return;
            }

            this.nextDirection = Direction.fromKey(keyboardEvent.key);
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
                <Title />
                <Row className="text-center">
                    <Col>
                        <Score score={this.board.snake?.pelletsEaten || 0} />
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <BoardComponent
                            size={15}
                            snakePoints={this.state.snakePoints}
                            pelletPoint={this.state.pelletPoint}
                        />
                    </Col>
                </Row>
                <Row className="mt-4 text-center">
                    <Col>
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
        this.board.spawnSnake();
        this.board.spawnPellet();

        do {
            this.setState({
                snakePoints: this.board.snake && [...this.board.snake.points],
                pelletPoint: this.board.pellet && this.board.pellet.point,
            });

            await sleep(90);
            this.board.moveSnake(this.nextDirection);
        } while (!this.board.isInIllegalState);

        this.gameOverAudio.play();
        this.setState({ inProgress: false, showGameOverModal: true });
    }

    private handleGameOver() {
        this.board.reset();

        this.setState({
            snakePoints: this.board.snake && this.board.snake.points,
            pelletPoint: this.board.pellet && this.board.pellet.point,
            showGameOverModal: false,
        });
    }

    get nextDirection() {
        // console.log(this.#inputDirections.map(d => d.name));
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
}

const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

export default App;
