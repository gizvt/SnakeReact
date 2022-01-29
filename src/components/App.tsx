import { Component } from "react";
import { BoardComponent } from "./Board/Board";
import Image from "react-bootstrap/Image";
import { Snake } from "../logic/snake";
import { Board } from "../logic/board";
import { Point } from "../logic/point";
import { Direction } from "../logic/direction";
import { Pellet } from "../logic/pellet";
import { Button } from "react-bootstrap";

interface Props {}

interface State {
    board: Board;
    nextDirections: Direction[];
}

export class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const board = new Board(15);
        this.state = { board, nextDirections: [] };
    }

    componentDidMount() {
        document.addEventListener("keydown", (keyboardEvent) => {
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
                            snakePoints={this.state.board.snake?.points}
                            pelletPoint={this.state.board.pellet?.point}
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
        this.spawnSnakeAndPellet();

        do {
            await sleep(90);
            const board = this.state.board;
            board.snake?.move(this.nextDirection);
            this.setState({ board });
        } while (!this.state.board.isInIllegalState);

        alert("Game over");
        this.resetBoard();
    }

    private async spawnSnakeAndPellet() {
        const snakePoints = this.state.board.getSnakeSpawnPoints();
        const snake = new Snake(snakePoints);

        let pelletPoint: Point;
        do {
            pelletPoint = this.state.board.getRandomPoint();
        } while (snake.containsPoint(pelletPoint));

        const pellet = new Pellet(pelletPoint);
        const board = new Board(this.state.board.size, snake, pellet);
        this.setState({ board });
    }

    private resetBoard() {
        this.setState({ board: new Board(this.state.board.size) });
    }

    get nextDirection() {
        // console.log(this.#inputDirections.map(d => d.name));
        const nextDirections = [...this.state.nextDirections];
        const nextDirection = nextDirections.shift() || Direction.None;
        this.setState({ nextDirections });
        return nextDirection;
    }

    private set nextDirection(direction: Direction) {
        if (!Direction.AllDirections.includes(direction)) {
            // Don't add if the input direction doesn't exist.
            return;
        }

        const nextDirections = [...this.state.nextDirections];

        // If there is no next direction...
        if (nextDirections.length === 0) {
            // ...don't record the input direction if it is opposite or equal to the snake's current direction.
            if (
                this.state.board.snake?.direction.isOppositeOrEqualTo(direction)
            ) {
                return;
            }
            // Else if there IS a next direction...
        } else if (nextDirections.length > 0) {
            // ...don't record the input direction it if it is opposite or equal to the next direction.
            if (nextDirections[0].isOppositeOrEqualTo(direction)) {
                return;
            }
        }

        // Only maintain a buffer of two input directions at once.
        if (nextDirections.length === 2) {
            nextDirections.shift();
        }

        nextDirections.push(direction);

        this.setState({ nextDirections });
    }
}

function Title() {
    return (
        <h1 className="text-center">
            <Image src="logo192.png" alt="" height={75} />
            SnakeReact
        </h1>
    );
}

const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

export default App;
