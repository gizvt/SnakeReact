import { Button, Form, Modal } from "react-bootstrap";

export interface Settings {
    wrapEnabled: boolean;
    audioEnabled: boolean;
}

interface Props {
    show: boolean;
    handleClose(): void;
    handleSettingsChange(newSettings: Settings): void;
    settings: Settings;
}

export function SettingsModal(props: Props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="bi bi-gear me-2"></i>Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                        onChange={(e) =>
                            props.handleSettingsChange({
                                ...props.settings,
                                wrapEnabled: e.target.checked,
                            })
                        }
                        type="switch"
                        label="Wrap"
                        checked={props.settings.wrapEnabled}
                    />
                    <Form.Check
                        onChange={(e) =>
                            props.handleSettingsChange({
                                ...props.settings,
                                audioEnabled: e.target.checked,
                            })
                        }
                        type="switch"
                        label="Audio"
                        checked={props.settings.audioEnabled}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
