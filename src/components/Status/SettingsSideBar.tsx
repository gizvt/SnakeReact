import { useEffect, useState } from "react";
import {
    Button,
    Card,
    FloatingLabel,
    Form,
    Offcanvas,
    Stack,
} from "react-bootstrap";
import {
    defaultSettings,
    GameMode,
    getPlayerName,
    getSettings,
    savePlayerName,
    saveSettings,
} from "../../modules";

interface Props {
    show: boolean;
    handleClose(): void;
}

export function SettingsSideBar(props: Props) {
    const [playerName, setPlayerName] = useState("");
    const [settings, setSettings] = useState(defaultSettings);

    const chosenGameMode = () => settings.gameMode;

    const onHide = async () => {
        await saveSettings(settings);
        await savePlayerName(playerName);
        props.handleClose();
    };

    useEffect(() => {
        async function fetchSettings() {
            const playerName = await getPlayerName();
            const settings = await getSettings();
            playerName && setPlayerName(playerName);
            setSettings(settings);
        }

        fetchSettings();
    }, []);

    return (
        <Offcanvas show={props.show} onHide={onHide}>
            <Offcanvas.Header className="border-bottom mb-4">
                <h3 className="offcanvas-title">
                    <i className="bi bi-gear me-3"></i>Settings
                </h3>
                <Button variant="close" onClick={onHide}></Button>
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0">
                <Stack direction="vertical" gap={4}>
                    <Card>
                        <Card.Header>
                            <i className="bi bi-person-circle me-2"></i> Player
                        </Card.Header>
                        <Card.Body>
                            <FloatingLabel label="Name" placeholder=" ">
                                <Form.Control
                                    type="text"
                                    placeholder=" "
                                    value={playerName}
                                    onChange={(e) =>
                                        setPlayerName(e.target.value)
                                    }
                                ></Form.Control>
                            </FloatingLabel>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            <i className="bi bi-sliders me-2"></i>Game
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Game mode</Form.Label>
                                    <Form.Select
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                gameMode: e.target
                                                    .value as GameMode,
                                            })
                                        }
                                    >
                                        <option
                                            selected={
                                                settings.gameMode === "classic"
                                            }
                                            value={"classic"}
                                        >
                                            Classic
                                        </option>
                                        <option
                                            selected={
                                                settings.gameMode === "wrap"
                                            }
                                            value={"wrap"}
                                        >
                                            Wrap
                                        </option>
                                        <option
                                            selected={
                                                settings.gameMode === "portal"
                                            }
                                            value={"portal"}
                                        >
                                            Portal
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                audioEnabled: e.target.checked,
                                            })
                                        }
                                        type="switch"
                                        label="Audio"
                                        checked={settings.audioEnabled}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            <i className="bi bi-dpad me-2"></i>Controls
                        </Card.Header>
                        <Card.Body>
                            <kbd>w a s d</kbd> or <kbd>↑ ← ↓ →</kbd> to move{" "}
                            <br />
                            <br />
                            <kbd>space</kbd> to pause the game
                        </Card.Body>
                    </Card>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
