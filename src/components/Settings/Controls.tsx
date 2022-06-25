import { Card } from "react-bootstrap";

export function Controls() {
    return (
        <Card>
            <Card.Header>
                <i className="bi bi-dpad me-2"></i>Controls
            </Card.Header>
            <Card.Body>
                <kbd>w a s d</kbd> or <kbd>↑ ← ↓ →</kbd> to move <br />
                <br />
                <kbd>space</kbd> to pause the game
            </Card.Body>
        </Card>
    );
}
