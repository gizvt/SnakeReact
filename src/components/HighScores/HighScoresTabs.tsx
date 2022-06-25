import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import {
    capitalise,
    GameModeHighScores,
    getAllHighScores,
} from "../../modules";
import { HighScoresTable } from "./HighScoresTable";

export function HighScoresTabs() {
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
        <Tabs defaultActiveKey="classic" className="mb-4" transition={true}>
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
    );
}
