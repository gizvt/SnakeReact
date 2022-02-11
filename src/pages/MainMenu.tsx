import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    FloatingLabel,
    Form,
    Row,
    Stack,
} from "react-bootstrap";
import { SettingsModal, Title } from "../components";
import { ControlsModal } from "../components/Status/ControlsModal";
import {
    getPlayerName,
    savePlayerName,
} from "../modules/services/settings-service";

export function MainMenu() {
    const [showControls, setShowControls] = useState(false);
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
            <ControlsModal
                show={showControls}
                handleClose={() => setShowControls(false)}
            />
            <Row className="text-center vh-75 d-flex align-items-center">
                <Col sm="auto" className="mx-auto">
                    <Stack direction="vertical" gap={2}>
                        <Title spinLogo={true} />
                        <FloatingLabel
                            label="Player name"
                            placeholder=" "
                            className="mt-5"
                        >
                            <Form.Control
                                type="text"
                                placeholder=" "
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                            ></Form.Control>
                        </FloatingLabel>
                        <Button
                            variant="outline-primary"
                            onClick={() => setShowSettings(true)}
                        >
                            Settings
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={() => setShowControls(true)}
                        >
                            Controls
                        </Button>
                        <Button href="/high-scores" variant="outline-primary">
                            High Scores
                            <i className="bi bi-chevron-right ms-2"></i>
                        </Button>
                        <Button
                            href="/game"
                            onClick={() => savePlayerName(playerName)}
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
