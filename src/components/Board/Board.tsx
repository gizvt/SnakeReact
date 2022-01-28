import { Component, ReactElement } from "react";
import { Cell, CellType } from "./Cell";
import "./Board.css";
import Button from "react-bootstrap/Button";

interface Props {
    size: number;
}

interface State {
    cells: CellType[];
}

export class Board extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cells: Array<CellType>(this.area).fill("Empty"),
        };
    }

    render() {
        const cells: ReactElement[] = [];

        this.state.cells.forEach((c, i) => {
            // let y = Math.floor(i / this.props.size);
            // let x = i - y * this.props.size;
            cells.push(this.renderCell(i, c));
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
        return this.state.cells.some((c) => c === "Snake");
    }

    private isPelletSpawned() {
        return this.state.cells.some((c) => c === "Pellet");
    }

    private spawnSnakeAndPellet() {
        const cells = this.state.cells.slice();
        this.spawnSnake(cells);
        this.spawnPellet(cells);
        this.setState({ cells });
    }

    private spawnSnake(cells: CellType[]) {
        if (this.isSnakeSpawned()) {
            return;
        }

        cells.splice(55, 3, "Snake", "Snake", "Snake");
    }

    private spawnPellet(cells: CellType[]) {
        if (this.isPelletSpawned()) {
            return;
        }

        let i: number;
        do {
            i = randomNumberBetween(0, this.area - 1);
        } while (cells[i] !== "Empty");

        cells[i] = "Pellet";
    }

    private renderCell(i: number, unit: CellType) {
        return <Cell key={i} unit={unit} />;
    }

    private get area() {
        return Math.pow(this.props.size, 2);
    }
}

function randomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
