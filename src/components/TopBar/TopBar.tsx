import { Col, Row, Stack } from "react-bootstrap";
import { PlayerName, Timer, Score, Title } from "..";

interface Props {
    score?: number;
    showTimer: boolean;
}

export function TopBar(props: Props) {
    return (
        <Row>
            <Col className="d-flex justify-content-center">
                <Stack direction="horizontal" gap={3} className="mt-3 mb-3">
                    <Title />
                    <div className="vr"></div>
                    <Stack direction="vertical" gap={2} className="">
                        <PlayerName />
                        {/* {props.showTimer && <Timer />} */}
                        <Score score={props.score || 0} />
                    </Stack>
                </Stack>
            </Col>
        </Row>
    );
}
