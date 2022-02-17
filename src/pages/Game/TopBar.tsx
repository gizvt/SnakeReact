import React from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { PlayerName, Score, Timer, Title } from "../../components";

interface Props {
    score?: number;
    showTimer: boolean;
    spinLogo: boolean;
}

export const TopBar = React.memo(function (props: Props) {
    return (
        <Row>
            <Col className="d-flex justify-content-center">
                <Stack direction="horizontal" gap={3} className="mt-3 mb-3">
                    <Title spinLogo={props.spinLogo} />
                    <div className="vr"></div>
                    <Stack direction="vertical" className="">
                        <PlayerName />
                        <Score score={props.score || 0} />
                        <Timer shouldRun={props.showTimer} />
                    </Stack>
                </Stack>
            </Col>
        </Row>
    );
});