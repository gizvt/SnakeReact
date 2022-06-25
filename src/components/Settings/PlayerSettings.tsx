import { useEffect, useRef, useState } from "react";
import { Card, FloatingLabel, Form } from "react-bootstrap";
import { getPlayerName, savePlayerName } from "../../modules";

export function PlayerSettings() {
    const [playerName, setPlayerName] = useState("");
    const playerNameLoaded = useRef(false);

    useEffect(() => {
        async function fetchPlayerSettings() {
            const playerName = await getPlayerName();
            playerName && setPlayerName(playerName);
            playerNameLoaded.current = true;
        }

        fetchPlayerSettings();
    }, []);

    useEffect(() => {
        async function save() {
            // Only save if the initial settings load has been done. This avoids
            // the default settings (initialised in useState) from being saved
            // over the existing settings when they are initially loaded.
            if (playerNameLoaded.current) {
                await savePlayerName(playerName);
            }
        }

        save();
    }, [playerName]);

    return (
        <Card>
            <Card.Header>
                <i className="bi bi-person-circle me-2"></i> Player
            </Card.Header>
            <Card.Body>
                <FloatingLabel label="Name" placeholder=" ">
                    <Form.Control
                        type="text"
                        placeholder=" " // If player name is empty, this makes the placeholder text display properly for an empty text box?
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    ></Form.Control>
                </FloatingLabel>
            </Card.Body>
        </Card>
    );
}
