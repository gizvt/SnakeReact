import { Button, Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    handleClose(): void;
}

export function ControlsModal(props: Props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Controls</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <kbd>w a s d</kbd> or <kbd>↑ ← ↓ →</kbd> to move <br />
                    <br />
                    <kbd>space</kbd> to pause the game
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
