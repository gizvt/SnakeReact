import { useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import {
    allGameModes,
    capitalise,
    defaultSettings,
    GameMode,
    getSettings,
    saveSettings,
} from "../../modules";

export function GameSettings() {
    const [settings, setSettings] = useState(defaultSettings);
    const settingsLoaded = useRef(false);

    useEffect(() => {
        async function fetchGameSettings() {
            const settings = await getSettings();
            setSettings(settings);
            settingsLoaded.current = true;
        }

        fetchGameSettings();
    }, []);

    useEffect(() => {
        async function save() {
            // Only save if the initial settings load has been done. This avoids
            // the default settings (initialised in useState) from being saved
            // over the existing settings when they are initially loaded.
            if (settingsLoaded.current) {
                await saveSettings(settings);
            }
        }

        save();
    }, [settings]);

    return (
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
                                    gameMode: e.target.value as GameMode,
                                })
                            }
                            value={settings.gameMode}
                        >
                            {allGameModes.map((gameMode) => (
                                <option key={gameMode} value={gameMode}>
                                    {capitalise(gameMode)}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Volume</Form.Label>
                        <div className="d-flex">
                            <div style={{ width: "10%" }}>
                                <b>{Math.round(settings.volume * 100)}</b>
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
                                ></Form.Range>
                            </div>
                        </div>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}
