import { useState } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components";
import { getSettings } from "../../modules";
import { SettingsSideBar } from "./SettingsSideBar";

export function MainMenu() {
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);

    const showSideBar = () => setShowSettings(true);
    const hideSideBar = () => setShowSettings(false);

    const navigateToGame = async () => {
        const savedSettings = await getSettings();
        navigate(`game?mode=${savedSettings.gameMode}`);
    };

    // Using navigate("path") inside an onClick instead of just doing
    // href="path" ensures that the audio plays when clicking. It might be
    // because it doesn't rerender the entire component tree (assumption from
    // watching the react browser tools component tree while navigating).
    return (
        <>
            <SettingsSideBar
                show={showSettings}
                handleClose={hideSideBar}
            ></SettingsSideBar>
            <Row className="text-center vh-75 d-flex align-items-center">
                <Col sm="auto" className="mx-auto">
                    <Stack direction="vertical" gap={2}>
                        <Title spinLogo={true} />
                        <Button
                            variant="outline-primary"
                            onClick={showSideBar}
                            className="mt-5"
                        >
                            Settings
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={() => navigate("/high-scores")}
                        >
                            High Scores
                            <i className="bi bi-chevron-right ms-2"></i>
                        </Button>
                        <Button onClick={navigateToGame}>
                            Play
                            <i className="bi bi-chevron-right ms-2"></i>
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}
