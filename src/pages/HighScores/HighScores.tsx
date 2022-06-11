import { useEffect, useState } from "react";
import { Button, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getHighScores, HighScore } from "../../modules";
import { HighScoresTable } from "./HighScoresTable";

export function HighScores() {
    const navigate = useNavigate();

    const [classicHighScores, setClassicHighScores] = useState<HighScore[]>([]);
    const [wrapHighScores, setWrapHighScores] = useState<HighScore[]>([]);
    const [portalHighScores, setPortalHighScores] = useState<HighScore[]>([]);
    const [reboundHighScores, setReboundHighScores] = useState<HighScore[]>([]);
    const [feastHighScores, setFeastHighScores] = useState<HighScore[]>([]);

    useEffect(() => {
        async function fetchHighScores() {
            const classic = await getHighScores("classic");
            const wrap = await getHighScores("wrap");
            const portal = await getHighScores("portal");
            const rebound = await getHighScores("rebound");
            const feast = await getHighScores("feast");

            setClassicHighScores(classic);
            setWrapHighScores(wrap);
            setPortalHighScores(portal);
            setReboundHighScores(rebound);
            setFeastHighScores(feast);
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
                    <Tab eventKey={"classic"} title="Classic">
                        <HighScoresTable highScores={classicHighScores} />
                    </Tab>
                    <Tab eventKey="wrap" title="Wrap">
                        <HighScoresTable highScores={wrapHighScores} />
                    </Tab>
                    <Tab eventKey="portal" title="Portal">
                        <HighScoresTable highScores={portalHighScores} />
                    </Tab>
                    <Tab eventKey="rebound" title="Rebound">
                        <HighScoresTable highScores={reboundHighScores} />
                    </Tab>
                    <Tab eventKey="feast" title="Feast">
                        <HighScoresTable highScores={feastHighScores} />
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    );
}
