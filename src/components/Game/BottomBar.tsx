import React, { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
    disableStartButton: boolean;
    handleStartGame(): void;
}

export const GameBottomBar = React.memo(function (props: Props) {
    const navigate = useNavigate();
    const startButton = useRef<HTMLButtonElement>(null);

    // This will remove focus from the button if we are disabling it. This is
    // to prevent the keydown events from being fired in Firefox when the
    // button is clicked and it becomes disabled. Firefox keeps focus on the
    // button and will not register the keydown events until clicking somewhere
    // else (thus un-focusing the button, as we are doing here).
    if (props.disableStartButton) {
        startButton.current?.blur();
    }

    return (
        <Row className="mt-4 text-center">
            <Col>
                <Button
                    className="me-3"
                    variant="outline-primary"
                    onClick={() => navigate("/")}
                >
                    <i className="bi bi-chevron-left me-2"></i>
                    Main Menu
                </Button>
                <Button
                    onClick={props.handleStartGame}
                    disabled={props.disableStartButton}
                    ref={startButton}
                >
                    Start Game
                </Button>
            </Col>
        </Row>
    );
});
