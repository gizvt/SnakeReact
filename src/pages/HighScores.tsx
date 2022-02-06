import { useEffect, useState } from "react";
import { Button, Col, Row, Stack, Table } from "react-bootstrap";
import { getHighScores, HighScore } from "../modules";

export function HighScores() {
    const [highScores, setHighScores] = useState<HighScore[]>([]);
    const len = highScores.length;

    useEffect(() => {
        async function fetchHighScores() {
            const highScores = await getHighScores();
            setHighScores(highScores);
        }

        fetchHighScores();
    }, []);

    return (
        <Row className="mt-5">
            <Col sm="8" className="mx-auto">
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
                            <th></th>
                            <th>#</th>
                            <th>Player Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highScores.sort(strongestFirst).map((hs, index) => (
                            <tr>
                                <td className="text-center">
                                    {getMedal(index)}
                                </td>
                                <td>{index + 1}</td>
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

const getMedal = (index: number) =>
    index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;

const strongestFirst = (a: HighScore, b: HighScore) =>
    b.score > a.score || (b.score === a.score && b.date < a.date) ? 1 : -1;
