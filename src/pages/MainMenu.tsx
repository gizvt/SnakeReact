import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { SettingsModal, Title } from "../components";
import {
    getPlayerName,
    savePlayerName,
} from "../modules/services/settings-service";

export function MainMenu() {
    const [showSettings, setShowSettings] = useState(false);
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        async function fetchPlayerName() {
            const playerName = await getPlayerName();
            playerName && setPlayerName(playerName);
        }

        fetchPlayerName();
    }, []);

    return (
        <>
            <SettingsModal
                show={showSettings}
                handleClose={() => setShowSettings(false)}
            />
            <Row className="text-center vh-75 d-flex align-items-center">
                <Col md={3} className="mx-auto">
                    <Stack direction="vertical" gap={2}>
                        <Title spinLogo={true} />
                        <InputGroup className="mt-4 mb-4">
                            <InputGroup.Text>
                                <i className="bi bi-person-circle"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                            ></Form.Control>
                        </InputGroup>
                        <Button
                            variant="outline-primary"
                            onClick={() => setShowSettings(true)}
                        >
                            Settings
                        </Button>
                        <Button href="/high-scores" variant="outline-primary">
                            High Scores
                            <i className="bi bi-chevron-right ms-2"></i>
                        </Button>
                        <Button
                            href="/game"
                            onClick={() => savePlayerName(playerName)}
                            className=""
                        >
                            Play
                            <i className="bi bi-chevron-right ms-2"></i>
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}
