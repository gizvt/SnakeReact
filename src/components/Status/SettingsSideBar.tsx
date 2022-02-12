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
                        <Card.Header>Player</Card.Header>
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
                        <Card.Header>Game</Card.Header>
                        <Card.Body>
                            <Form.Check
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        wrapEnabled: e.target.checked,
                                    })
                                }
                                type="switch"
                                label="Wrap"
                                checked={settings.wrapEnabled}
                            />
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
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Controls</Card.Header>
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
