import { Component } from "react";
import { Cell, CellType } from "./Cell";
import "./Board.css";
import Button from "react-bootstrap/Button";
import { Direction } from "../../logic/direction";
import { Point } from "../../logic/point";
import { Snake } from "../../logic/snake";
import { Pellet } from "../../logic/pellet";

interface Cells {
    [key: string]: CellType;
}

interface Props {
    size: number;
}

interface State {
    cells: Cells;
    pellet?: Pellet;
    snake?: Snake;
}

export class Board extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const cells: Cells = {};

        for (let i = 0; i < this.area; i++) {
            let y = Math.floor(i / this.props.size);
            let x = i - y * this.props.size;
            cells[new Point(x, y).toString()] = "Empty";
        }

        this.state = { cells };
    }

    render() {
        const cells: JSX.Element[] = [];

        Object.entries(this.state.cells).forEach(([k, v]) => {
            cells.push(this.renderCell(k, v));
        });

        return (
            <div className="text-center">
                <div className="row">
                    <div className="col">
                        <div className="board">{cells}</div>
                    </div>
                </div>
                <Button
                    className="mt-4"
                    variant="primary"
                    onClick={() => this.spawnSnakeAndPellet()}
                >
                    Start Game
                </Button>
            </div>
        );
    }

    private isSnakeSpawned() {
        return !!this.state.snake;
    }

    private isPelletSpawned() {
        return !!this.state.pellet;
    }

    private spawnSnakeAndPellet() {
        const cells = { ...this.state.cells };
        this.spawnSnake(cells);
        this.spawnPellet(cells);
        this.setState({ cells });
    }

    private moveSnake(direction: Direction) {
        if (!this.state.snake) {
            return;
        }

        const cells: Cells = { ...this.state.cells };
        const snake = new Snake(this.state.snake.points);
        const tail = snake.popTail();

        if (tail) {
            cells[tail.toString()] = "Empty";
        }

        const head = snake.peekHead();
        const newHead = head.move(direction);
        snake.spawnNewHead(newHead);
        snake.points.forEach((point) => (cells[point.toString()] = "Snake"));
        this.setState({ cells, snake });
    }

    private spawnSnake(cells: Cells) {
        if (this.isSnakeSpawned()) {
            return;
        }

        let centrePoint = Point.inCentreOf(this.props.size);

        const points = [
            centrePoint.move(Direction.Left),
            centrePoint,
            centrePoint.move(Direction.Right),
        ];

        points.forEach((point) => (cells[point.toString()] = "Snake"));
        this.setState({ snake: new Snake(points) });
    }

    private spawnPellet(cells: Cells) {
        if (this.isPelletSpawned()) {
            return;
        }

        let point: Point;
        do {
            point = Point.random(this.props.size);
        } while (cells[point.toString()] !== "Empty");

        cells[point.toString()] = "Pellet";
        this.setState({ pellet: new Pellet(point) });
    }

    private renderCell(coords: string, type: CellType) {
        return <Cell key={coords} type={type} />;
    }

    private get area() {
        return Math.pow(this.props.size, 2);
    }
}
