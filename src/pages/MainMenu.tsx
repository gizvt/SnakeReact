import { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { SettingsModal, Title } from "../components";

export function MainMenu() {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <SettingsModal
                show={showSettings}
                handleClose={() => setShowSettings(false)}
            />
            <Row className="text-center vh-75 d-flex align-items-center">
                <Col md={3} className="mx-auto">
                    <Stack direction="vertical" gap={4}>
                        <Title spinLogo={true} />
                        <InputGroup className="mt-5">
                            <InputGroup.Text>
                                <i className="bi bi-person-circle"></i>
                            </InputGroup.Text>
                            <Form.Control type="text"></Form.Control>
                        </InputGroup>
                        <Button onClick={() => setShowSettings(true)}>
                            Settings
                        </Button>
                        <Button href="/game">Play!</Button>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}
