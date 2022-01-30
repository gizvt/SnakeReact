import { Button, Form, Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    handleClose(): void;
    handleWrapChange(wrap: boolean): void;
    wrap: boolean;
}

export function Settings(props: Props) {
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
                        id="custom-switch"
                        label="Wrap"
                        checked={props.wrap}
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
