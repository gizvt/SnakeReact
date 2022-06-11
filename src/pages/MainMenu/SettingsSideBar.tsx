import { useEffect, useRef, useState } from "react";
import {
    Button,
    Card,
    FloatingLabel,
    Form,
    Offcanvas,
    Stack,
} from "react-bootstrap";
import {
    AudioPlayer,
    defaultSettings,
    GameMode,
    getPlayerName,
    getSettings,
    savePlayerName,
    saveSettings,
    Sound,
} from "../../modules";

interface Props {
    show: boolean;
    handleClose(): void;
}

export function SettingsSideBar(props: Props) {
    const [playerName, setPlayerName] = useState("");
    const [settings, setSettings] = useState(defaultSettings);

    const audioPlayer = useRef(new AudioPlayer());

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
                                        defaultValue={settings.gameMode}
                                    >
                                        <option value={"classic"}>
                                            Classic
                                        </option>
                                        <option value={"wrap"}>Wrap</option>
                                        <option value={"portal"}>Portal</option>
                                        <option value={"rebound"}>
                                            Rebound
                                        </option>
                                        <option value={"feast"}>Feast</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Volume</Form.Label>
                                    <div className="d-flex">
                                        <div style={{ width: "10%" }}>
                                            <b>
                                                {Math.round(
                                                    settings.volume * 100
                                                )}
                                            </b>
                                        </div>
                                        <div className="flex-grow-1">
                                            <Form.Range
                                                min={0}
                                                max={1}
                                                step={0.01}
                                                value={settings.volume}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        volume: +e.target.value,
                                                    })
                                                }
                                                onMouseUp={() => {
                                                    audioPlayer.current.volume =
                                                        settings.volume;

                                                    audioPlayer.current.play(
                                                        Sound.GameOver
                                                    );
                                                }}
                                            ></Form.Range>
                                        </div>
                                    </div>
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
