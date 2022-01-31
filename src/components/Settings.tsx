import { Button, Form, Modal } from "react-bootstrap";
import { Settings } from "./App";

interface Props {
    show: boolean;
    handleClose(): void;
    handleWrapChange(wrap: boolean): void;
    handleAudioChange(audio: boolean): void;
    settings: Settings;
}

export function SettingsComponent(props: Props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                        onChange={(e) =>
                            props.handleWrapChange(e.target.checked)
                        }
                        type="switch"
                        label="Wrap"
                        checked={props.settings.wrapEnabled}
                    />
                    <Form.Check
                        onChange={(e) =>
                            props.handleAudioChange(e.target.checked)
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
