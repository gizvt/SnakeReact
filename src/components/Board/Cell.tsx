import React from "react";

export type CellType = "Snake" | "Pellet" | "Empty";

export interface Props {
    type: CellType;
}

export const Cell = React.memo(function Cell(props: Props) {
    console.log(`Rendering a cell of type ${props.type}`);
    switch (props.type) {
        case "Empty":
            return <div className="cell"></div>;
        case "Pellet":
            return <div className="cell pellet"></div>;
        case "Snake":
            return <div className="cell snake"></div>;
        default:
            throw new Error("Unrecognised Cell Type.");
    }
});
