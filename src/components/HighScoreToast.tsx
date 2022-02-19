import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    score: number;
}

export const HighScoreToast = React.memo(function HighScoreToast(props: Props) {
    const [show, setShow] = useState(true);

    return (
        <ToastContainer className="p-3" position="bottom-end">
            <Toast
                show={show}
                delay={5000}
                autohide
                onClose={() => setShow(false)}
            >
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
