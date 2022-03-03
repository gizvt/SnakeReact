import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    show: boolean;
    score: number;
    handleClose(): void;
}

// Handling the closing of the toast in here was difficult so it is handled in
// the useGameState hook.
export const HighScoreToast = React.memo(function HighScoreToast(props: Props) {
    return (
        <ToastContainer className="p-3" position="bottom-end">
            <Toast show={props.show} onClose={props.handleClose}>
                <Toast.Header>
                    🏆 <strong className="ms-2 me-auto">New high score!</strong>
                </Toast.Header>
                <Toast.Body>
                    You scored <strong>{props.score}</strong> points, which
                    happens to be a new high score 🎉
                    <div className="mt-2">
                        <Link to="/high-scores">Show me</Link>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
});
