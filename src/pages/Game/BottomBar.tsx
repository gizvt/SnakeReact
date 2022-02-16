import React from "react";
import { Button, Col, Row } from "react-bootstrap";

interface Props {
    disableStartButton: boolean;
    handleStartGame(): void;
}

export const BottomBar = React.memo(function (props: Props) {
    return (
        <Row className="mt-4 text-center">
            <Col>
                <Button className="me-3" variant="outline-primary" href="/">
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
