import { PureComponent } from "react";
import "./Board.css";

interface Props {
    size: number;
}

export class Board extends PureComponent<Props> {
    private readonly style = {
        gridTemplateColumns: `repeat(${this.props.size}, auto)`,
    };

    render() {
        return (
            <div className="board" style={this.style}>
                {this.props.children}
            </div>
        );
    }
}
