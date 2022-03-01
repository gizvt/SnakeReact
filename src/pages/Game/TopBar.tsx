import React from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { PlayerName, Score, Timer, Title } from "../../components";
import { GameStatus } from "../../hooks/game-state";

interface Props {
    score?: number;
    gameStatus: GameStatus;
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
                        <Timer status={getTimerStatus(props.gameStatus)} />
                    </Stack>
                </Stack>
            </Col>
        </Row>
    );
});

function getTimerStatus(
    gameStatus: GameStatus
): "Active" | "Stopped" | "Paused" {
    switch (gameStatus) {
        case "InProgress":
            return "Active";
        case "Idle":
            return "Stopped";
        case "GameOver":
        case "Paused":
            return "Paused";
    }
}
