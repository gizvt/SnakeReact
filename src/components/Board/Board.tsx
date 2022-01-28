import { Component, ReactElement } from "react";
import { Cell, CellType } from "./Cell";
import "./Board.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
// import { Button } from "../Controls/Button";

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
                <div className="row col">
                    <h1>
                        <Image src="logo192.png" alt="" height={75} />
                        SnakeReact
                    </h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="board">{cells}</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <Button
                            variant="primary"
                            onClick={() => this.spawnSnake()}
                        >
                            Start Game
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    private isSnakeSpawned() {
        return this.state.cells.some((c) => c === "Snake");
    }

    private spawnSnake() {
        if (this.isSnakeSpawned()) {
            return;
        }

        const cells = this.state.cells.slice();
        cells.splice(55, 3, "Snake", "Snake", "Snake");
        this.setState({ cells });
    }

    private renderCell(i: number, unit: CellType) {
        return <Cell key={i} unit={unit} />;
    }

    private get area() {
        return Math.pow(this.props.size, 2);
    }
}
