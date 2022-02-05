import { Col, Row } from "react-bootstrap";
import { PlayerName, Timer, Score, Title } from "..";

interface Props {
    score?: number;
    showTimer: boolean;
}

export function TopBar(props: Props) {
    return (
        <>
            <Title />
            <Row className="text-center">
                <Col>
                    <PlayerName />
                    {/* {props.showTimer && <Timer />} */}
                    <Score score={props.score || 0} />
                </Col>
            </Row>
        </>
    );
}
