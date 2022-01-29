import { Component } from "react";
import { BoardComponent } from "./Board/Board";
import { Board } from "../logic/board";
import { Point } from "../logic/point";
import { Direction } from "../logic/direction";
import { Button } from "react-bootstrap";
import { Title } from "./Title";

interface Props {}

interface State {
    inProgress: boolean;
    snakePoints: Point[] | null;
    pelletPoint: Point | null;
}

export class App extends Component<Props, State> {
    private board: Board = new Board(15);
    private readonly inputQueue: Direction[] = [];

    constructor(props: Props) {
        super(props);
        this.state = {
            snakePoints: null,
            pelletPoint: null,
            inProgress: false,
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
                <Title />
                <div className="row text-center">
                    <div className="col">
                        <BoardComponent
                            size={15}
                            snakePoints={this.state.snakePoints}
                            pelletPoint={this.state.pelletPoint}
                        />
                    </div>
                </div>
                <div className="row mt-4 text-center">
                    <div className="col">
                        <Button onClick={async () => await this.startGame()}>
                            Start Game
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    async startGame() {
        this.setState({ inProgress: true });
        this.spawnSnakeAndPellet();

        do {
            await sleep(90);
            this.board.snake!.move(this.nextDirection);
            this.setState({ snakePoints: [...this.board.snake!.points] });
        } while (!this.board.isInIllegalState);

        alert("Game over");
        this.board.reset();

        this.setState({
            snakePoints: this.board.snake && this.board.snake.points,
            pelletPoint: this.board.pellet && this.board.pellet.point,
            inProgress: false,
        });
    }

    private spawnSnakeAndPellet() {
        this.board.spawnSnake();
        this.board.spawnPellet();

        this.setState({
            snakePoints: this.board.snake && this.board.snake.points,
            pelletPoint: this.board.pellet && this.board.pellet.point,
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
