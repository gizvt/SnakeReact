import { Component } from "react";
import { Cell, CellType } from "./Cell";
import "./Board.css";
import Button from "react-bootstrap/Button";
import { Direction } from "../../logic/direction";
import { Point } from "../../logic/point";

interface Cells {
    [key: string]: CellType;
}

interface Props {
    size: number;
}

interface State {
    cells: Cells;
    pelletPoint: Point | null;
    snakePoints: Point[];
    snakeDirection: Direction;
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

        this.state = {
            cells,
            pelletPoint: null,
            snakePoints: [],
            snakeDirection: Direction.Left,
        };
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
        return !!this.state.snakePoints.length;
    }

    private isPelletSpawned() {
        return !!this.state.pelletPoint;
    }

    private spawnSnakeAndPellet() {
        const cells = { ...this.state.cells };
        this.spawnSnake(cells);
        this.spawnPellet(cells);
        this.setState({ cells });
    }

    private moveSnake(direction: Direction) {
        const cells: Cells = { ...this.state.cells };
        const snakePoints = [...this.state.snakePoints];
        const tail = snakePoints.pop();

        if (tail) {
            cells[tail.toString()] = "Empty";
        }

        const head = snakePoints[0];
        const newHead = head.move(direction);
        snakePoints.unshift(newHead);
        snakePoints.forEach((point) => (cells[point.toString()] = "Snake"));
        this.setState({ cells, snakePoints });
    }

    private spawnSnake(cells: Cells) {
        if (this.isSnakeSpawned()) {
            return;
        }

        let centrePoint = Point.inCentreOf(this.props.size);

        const snakePoints = [
            centrePoint.move(Direction.Left),
            centrePoint,
            centrePoint.move(Direction.Right),
        ];

        snakePoints.forEach((point) => (cells[point.toString()] = "Snake"));
        this.setState({ snakePoints });
    }

    private spawnPellet(cells: Cells) {
        if (this.isPelletSpawned()) {
            return;
        }

        let pelletPoint: Point;
        do {
            pelletPoint = Point.random(this.props.size);
        } while (cells[pelletPoint.toString()] !== "Empty");

        cells[pelletPoint.toString()] = "Pellet";
        this.setState({ pelletPoint });
    }

    private renderCell(coords: string, type: CellType) {
        return <Cell key={coords} type={type} />;
    }

    private get area() {
        return Math.pow(this.props.size, 2);
    }
}
