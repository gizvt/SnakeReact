import { Button, Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    handleHide(showSettings: boolean): void;
    handleContinue(): void;
}

export function NoPlayerNameModal(props: Props) {
    return (
        <Modal show={props.show} backdrop="static" centered>
            <Modal.Header>
                <Modal.Title>High scores are disabled</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You have not entered a player name in the settings menu, so high
                scores will not be recorded.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={() => props.handleHide(false)}>
                    Cancel
                </Button>
                <Button
                    className=""
                    variant="outline-primary"
                    onClick={() => props.handleHide(true)}
                >
                    Open settings
                </Button>
                <Button variant="primary" onClick={props.handleContinue}>
                    Continue <i className="bi bi-chevron-right ms-2"></i>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
