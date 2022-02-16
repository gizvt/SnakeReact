import React from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    score: number;
    handleClose(): void;
}

export const GameOverModal = React.memo(function (props: Props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
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
});
