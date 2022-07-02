import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getPlayerName, getSettings } from "../../modules";
import { Title } from "../Title";
import { NoPlayerNameModal } from "./NoPlayerNameModal";

interface Props {
    handleSettingsClick(): void;
}

// Using navigate("path") inside an onClick instead of just doing
// href="path" ensures that the audio plays when clicking. It might be
// because it doesn't rerender the entire component tree (assumption from
// watching the react browser tools component tree while navigating).
export function MainMenuNavigation(props: Props) {
    const navigate = useNavigate();
    const [showNoPlayerNameModal, setShowNoPlayerNameModal] = useState(false);

    const handleModalHide = (showSettings: boolean) => {
        setShowNoPlayerNameModal(false);

        if (showSettings) {
            props.handleSettingsClick();
        }
    };

    const handlePlayClick = async () => {
        const playerName = await getPlayerName();

        if (!playerName) {
            setShowNoPlayerNameModal(true);
        } else {
            navigateToGame();
        }
    };

    const navigateToGame = async () => {
        const savedSettings = await getSettings();
        navigate(`game?mode=${savedSettings.gameMode}`);
    };

    return (
        <>
            <NoPlayerNameModal
                show={showNoPlayerNameModal}
                handleHide={handleModalHide}
                handleContinue={navigateToGame}
            />
            <Stack direction="vertical" gap={2}>
                <Title spinLogo={true} />
                <Button
                    variant="outline-primary"
                    onClick={props.handleSettingsClick}
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
                <Button onClick={handlePlayClick}>
                    Play
                    <i className="bi bi-chevron-right ms-2"></i>
                </Button>
            </Stack>
        </>
    );
}
