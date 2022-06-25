import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function HighScoresTopBar() {
    const navigate = useNavigate();

    return (
        <Stack direction="horizontal" className="mb-4">
            <Button
                className="me-3 me-auto"
                variant="outline-primary"
                onClick={() => navigate("/")}
            >
                <i className="bi bi-chevron-left me-2"></i>
                Main Menu
            </Button>
            <h1 className="display-5 me-auto">High Scores</h1>
        </Stack>
    );
}
