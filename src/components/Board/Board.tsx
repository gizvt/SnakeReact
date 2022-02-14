import { Profiler, PureComponent } from "react";
import { Col, Row } from "react-bootstrap";

interface Props {
    size: number;
}

export class Board extends PureComponent<Props> {
    private readonly style = {
        gridTemplateColumns: `repeat(${this.props.size}, auto)`,
    };

    render() {
        return (
            // <Profiler
            //     id="cellsProfiler"
            //     onRender={(...rest) => console.log(rest[1], rest[2])}
            // >
            <Row className="text-center">
                <Col>
                    <div className="board" style={this.style}>
                        {this.props.children}
                    </div>
                </Col>
            </Row>
            // </Profiler>
        );
    }
}
