import { PureComponent } from "react";
import { Col, Row } from "react-bootstrap";
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
            <Row className="text-center">
                <Col>
                    <div className="board" style={this.style}>
                        {this.props.children}
                    </div>
                </Col>
            </Row>
        );
    }
}
