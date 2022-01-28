import "./Cell.css";

export type CellType = "Snake" | "Pellet" | "Empty";

interface Props {
    unit: CellType;
}

export function Cell(props: Props) {
    switch (props.unit) {
        case "Empty":
            return <div className="cell"></div>;
        case "Pellet":
            return <div className="cell pellet"></div>;
        case "Snake":
            return <div className="cell snake"></div>;
        default:
            throw new Error("Unrecognised Cell Type.");
    }
}
