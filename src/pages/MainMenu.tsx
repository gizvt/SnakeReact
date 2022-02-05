import { Button, Col, Row, Stack } from "react-bootstrap";
import { Title } from "../components";

export function MainMenu() {
    return (
        <Row className="text-center vh-75 d-flex align-items-center">
            <Col md={3} className="mx-auto">
                <Stack direction="vertical" gap={4}>
                    <Title />
                    <Button href="/game">Play!</Button>
                </Stack>
            </Col>
        </Row>
    );
}
