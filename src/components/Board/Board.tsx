import { Component, PureComponent } from "react";
import "./Board.css";

export class BoardComponent extends PureComponent {
    private readonly style = {
        gridTemplateColumns: `repeat(15, auto)`,
    };

    render() {
        return (
            <div className="board" style={this.style}>
                {this.props.children}
            </div>
        );
    }
}
