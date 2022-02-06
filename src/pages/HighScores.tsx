import { useEffect, useState } from "react";
import { Button, Col, Row, Stack, Table } from "react-bootstrap";
import { getHighScores, HighScore } from "../modules";

export function HighScores() {
    const [highScores, setHighScores] = useState<HighScore[]>([]);

    useEffect(() => {
        async function fetchHighScores() {
            const highScores = await getHighScores();
            setHighScores(highScores);
        }

        fetchHighScores();
    }, []);

    return (
        <Row className="mt-5">
            <Col className="text-center">
                <Stack direction="horizontal" className="mb-4">
                    <Button
                        className="me-3 me-auto"
                        variant="outline-primary"
                        href="/"
                    >
                        <i className="bi bi-chevron-left me-2"></i>
                        Main Menu
                    </Button>
                    <h1 className="display-5 me-auto">High Scores</h1>
                </Stack>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highScores.map((hs) => (
                            <tr>
                                <td>{hs.playerName}</td>
                                <td>{hs.score}</td>
                                <td>{hs.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}
