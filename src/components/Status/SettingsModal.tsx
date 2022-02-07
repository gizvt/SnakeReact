import { Button, Form, Modal } from "react-bootstrap";
import {
    defaultSettings,
    getSettings,
    saveSettings,
} from "../../modules/services/settings-service";
import { useEffect, useState } from "react";

interface Props {
    show: boolean;
    handleClose(): void;
}

export function SettingsModal(props: Props) {
    const [settings, setSettings] = useState(defaultSettings);
    const onCloseClick = async () => {
        await saveSettings(settings);
        props.handleClose();
    };

    useEffect(() => {
        async function fetchSettings() {
            const settings = await getSettings();
            setSettings(settings);
        }

        fetchSettings();
    }, []);

    return (
        <Modal show={props.show} onHide={() => onCloseClick()} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="bi bi-gear me-2"></i>Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onCloseClick()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
