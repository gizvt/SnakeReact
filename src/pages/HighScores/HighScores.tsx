import { useEffect, useState } from "react";
import { Button, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    capitalise,
    GameModeHighScores,
    getAllHighScores,
} from "../../modules";
import { HighScoresTable } from "./HighScoresTable";

export function HighScores() {
    const navigate = useNavigate();

    const [allHighScores, setAllHighScores] = useState<GameModeHighScores[]>(
        []
    );

    useEffect(() => {
        async function fetchHighScores() {
            const allHighScores = await getAllHighScores();
            setAllHighScores(allHighScores);
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
                        onClick={() => navigate("/")}
                    >
                        <i className="bi bi-chevron-left me-2"></i>
                        Main Menu
                    </Button>
                    <h1 className="display-5 me-auto">High Scores</h1>
                </Stack>
                <Tabs
                    defaultActiveKey="classic"
                    className="mb-4"
                    transition={true}
                >
                    {allHighScores.map((gameModeHighScores) => (
                        <Tab
                            key={gameModeHighScores.gameMode}
                            eventKey={gameModeHighScores.gameMode}
                            title={capitalise(gameModeHighScores.gameMode)}
                        >
                            <HighScoresTable
                                highScores={gameModeHighScores.highScores}
                            />
                        </Tab>
                    ))}
                </Tabs>
            </Col>
        </Row>
    );
}
