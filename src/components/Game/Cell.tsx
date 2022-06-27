import React from "react";

export interface Props {
    colour: string;
}

export const Cell = React.memo(function Cell(props: Props) {
    console.log(`Rendering a cell with colour ${props.colour}`);

    return (
        <div className="cell" style={{ backgroundColor: props.colour }}></div>
    );
});
