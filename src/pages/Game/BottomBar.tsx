import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
    disableStartButton: boolean;
    handleStartGame(): void;
}

export const BottomBar = React.memo(function (props: Props) {
    const navigate = useNavigate();

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
                >
                    Start Game
                </Button>
            </Col>
        </Row>
    );
});
