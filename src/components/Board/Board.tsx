import { memo, useRef, useState } from "react";
import { ReactElement, useEffect } from "react";
import { FunctionComponent, Profiler, PureComponent } from "react";
import { Col, Row } from "react-bootstrap";
import { Cell, CellType } from "..";
import { Point } from "../../modules";

interface Cells {
    [key: string]: ReactElement;
}

interface Props {
    size: number;
    snakeCoords: string[];
    pelletCoords: string[];
}

export const Board: FunctionComponent<Props> = (props) => {
    const emptyCells = useRef<Cells>(createCells(props.size));
    const [cells, setCells] = useState<Cells>(emptyCells.current);

    // useEffect(() => {
    //     const emptyCells = createCells(props.size);
    //     setCells(emptyCells);
    //     emptyCells.current = emptyCells;
    // }, [props.size]);

    useEffect(() => {
        setCells(() => {
            const newCells = { ...emptyCells.current };

            props.snakeCoords.forEach(
                (p) => (newCells[p] = createCell(p, "Snake"))
            );

            props.pelletCoords.forEach(
                (p) => (newCells[p] = createCell(p, "Pellet"))
            );

            return newCells;
        });
    }, [props.pelletCoords, props.snakeCoords]);

    // useEffect(() => {
    //     // let newSnakeCells: Cells = {};
    //     // // const newPoints = props.snakePoints.map((p) => createCell(p, "Snake") as Cells);
    //     // props.snakePoints.forEach(
    //     //     (p) => (newSnakeCells[p] = createCell(p, "Snake"))
    //     // );
    //     setCells((cells) => {
    //         const newCells = { ...cells };
    //         props.snakeCoords.forEach(
    //             (p) => (newCells[p] = createCell(p, "Snake"))
    //         );
    //         return newCells;
    //         //return { ...cells, ...newSnakeCells };
    //     });
    // }, [props.snakeCoords]);

    // useEffect(() => {
    //     setCells((cells) => {
    //         const newCells = { ...cells };
    //         props.pelletCoords.forEach(
    //             (p) => (newCells[p] = createCell(p, "Pellet"))
    //         );
    //         return newCells;
    //     });
    // }, [props.pelletCoords]);

    const style = {
        gridTemplateColumns: `repeat(${props.size}, auto)`,
    };

    return (
        <Profiler
            id="cellsProfiler"
            onRender={(...rest) => console.log(rest[1], rest[2])}
        >
            <Row className="text-center">
                <Col>
                    <div className="board" style={style}>
                        {Object.values(cells)}
                    </div>
                </Col>
            </Row>
        </Profiler>
    );
};

function createCells(boardSize: number) {
    let cells: Cells = {};

    for (let i = 0; i < Math.pow(boardSize, 2); i++) {
        const y = Math.floor(i / boardSize);
        const x = i - y * boardSize;
        const point = new Point(x, y).toString();
        cells[point] = createCell(point, "Empty");
        // cells = { ...cells, ...createCell(point, "Empty") };
    }

    return cells;
}

function createCell(coords: string, type: CellType) {
    // return { [coords]: <Cell key={coords} type={type} /> };
    return <Cell key={coords} type={type} />;
}
