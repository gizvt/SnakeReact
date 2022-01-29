import { Button, Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    score: number;
    handleClose(): void;
}

export function GameOverModal(props: Props) {
    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Game over!</Modal.Title>
            </Modal.Header>
            <Modal.Body>You scored {props.score} points</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
