import { useState } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
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
                        <Title />
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
