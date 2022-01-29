import { Component } from "react";
import { Cell, CellType } from "./Cell";
import { Point } from "../../logic/point";
import "./Board.css";

interface Props {
    size: number;
    snakePoints: Point[] | null;
    pelletPoint: Point | null;
}

export class BoardComponent extends Component<Props> {
    render() {
        const cells: JSX.Element[] = [];

        for (let i = 0; i < this.area; i++) {
            let y = Math.floor(i / this.props.size);
            let x = i - y * this.props.size;
            let point = new Point(x, y);

            cells.push(
                this.renderCell(point.toString(), this.getCellType(point))
            );
        }

        return <div className="board">{cells}</div>;
    }

    private get area() {
        return Math.pow(this.props.size, 2);
    }

    private renderCell(coords: string, type: CellType) {
        return <Cell key={coords} type={type} />;
    }

    private getCellType(point: Point): CellType {
        const pelletPoint = this.props.pelletPoint;
        const snakePoints = this.props.snakePoints;

        if (pelletPoint && point.equals(pelletPoint)) {
            return "Pellet";
        } else if (
            snakePoints &&
            snakePoints.find((snakePoint) => snakePoint.equals(point))
        ) {
            return "Snake";
        }

        return "Empty";
    }
}
