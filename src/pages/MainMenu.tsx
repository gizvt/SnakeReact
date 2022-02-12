import { useState } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { SettingsSideBar, Title } from "../components";

export function MainMenu() {
    const [showSettings, setShowSettings] = useState(false);

    const showSideBar = () => setShowSettings(true);
    const hideSideBar = () => setShowSettings(false);

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
                        <Button href="/high-scores" variant="outline-primary">
                            High Scores
                            <i className="bi bi-chevron-right ms-2"></i>
                        </Button>
                        <Button href="/game">
                            Play
                            <i className="bi bi-chevron-right ms-2"></i>
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </>
    );
}
