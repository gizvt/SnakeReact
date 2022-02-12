import { useEffect, useState } from "react";
import { Button, Col, Row, Stack, Tab, Table, Tabs } from "react-bootstrap";
import { HighScoresTable } from "../components/HighScores/HighScoresTable";
import { getHighScores, HighScore } from "../modules";

export function HighScores() {
    const [wrapHighScores, setWrapHighScores] = useState<HighScore[]>([]);
    const [noWrapHighScores, setNoWrapHighScores] = useState<HighScore[]>([]);

    useEffect(() => {
        async function fetchHighScores() {
            const wrapHighScores = await getHighScores(true);
            const noWrapHighScores = await getHighScores(false);
            setWrapHighScores(wrapHighScores);
            setNoWrapHighScores(noWrapHighScores);
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
                <Tabs
                    defaultActiveKey="noWrap"
                    className="mb-4"
                    transition={true}
                >
                    <Tab eventKey="noWrap" title="Classic: No Wrap">
                        <HighScoresTable highScores={noWrapHighScores} />
                    </Tab>
                    <Tab eventKey="wrap" title="Classic: Wrap">
                        <HighScoresTable highScores={wrapHighScores} />
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    );
}
