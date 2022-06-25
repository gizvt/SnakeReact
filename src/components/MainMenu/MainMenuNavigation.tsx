import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getSettings } from "../../modules";
import { Title } from "../Title";

interface Props {
    handleSettingsClick(): void;
}

// Using navigate("path") inside an onClick instead of just doing
// href="path" ensures that the audio plays when clicking. It might be
// because it doesn't rerender the entire component tree (assumption from
// watching the react browser tools component tree while navigating).
export function MainMenuNavigation(props: Props) {
    const navigate = useNavigate();

    const navigateToGame = async () => {
        const savedSettings = await getSettings();
        navigate(`game?mode=${savedSettings.gameMode}`);
    };

    return (
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
            <Button onClick={navigateToGame}>
                Play
                <i className="bi bi-chevron-right ms-2"></i>
            </Button>
        </Stack>
    );
}
