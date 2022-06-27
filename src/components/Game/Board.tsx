import {
    FunctionComponent,
    Profiler,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import { Cell } from "..";
import { defaultSettings, getSettings, Point, Settings } from "../../modules";

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
    let settings = useRef<Settings>(defaultSettings);

    useEffect(() => {
        async function fetchSettings() {
            const savedSettings = await getSettings();
            settings.current = savedSettings;
        }

        fetchSettings();
    }, []);

    useEffect(() => {
        setCells(() => {
            const newCells = { ...emptyCells.current };

            props.snakeCoords.forEach(
                (p) =>
                    (newCells[p] = createCell(p, settings.current.snakeColour))
            );

            props.pelletCoords.forEach(
                (p) =>
                    (newCells[p] = createCell(p, settings.current.pelletColour))
            );

            return newCells;
        });
    }, [props.pelletCoords, props.snakeCoords]);

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
        cells[point] = createCell(point, "#ffffff");
    }

    return cells;
}

function createCell(coords: string, colour: string) {
    return <Cell key={coords} colour={colour} />;
}
