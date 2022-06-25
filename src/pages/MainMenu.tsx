import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { SettingsSideBar } from "../components/Settings/SettingsSideBar";
import { MainMenuNavigation } from "../components/MainMenu/MainMenuNavigation";

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
                    <MainMenuNavigation handleSettingsClick={showSideBar} />
                </Col>
            </Row>
        </>
    );
}
