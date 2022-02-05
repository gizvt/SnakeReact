import { Button, Col, Row } from "react-bootstrap";

interface Props {
    handleShowSettings(): void;
    handleStartGame(): void;
}

export function BottomBar(props: Props) {
    return (
        <Row className="mt-4 text-center">
            <Col>
                <Button className="me-3" variant="outline-primary" href="/">
                    <i className="bi bi-chevron-left me-2"></i>
                    Main Menu
                </Button>
                <Button
                    className="me-3"
                    variant="outline-primary"
                    onClick={props.handleShowSettings}
                >
                    Settings
                </Button>
                <Button onClick={props.handleStartGame}>Start Game</Button>
            </Col>
        </Row>
    );
}
