import { useEffect, useState } from "react";
import { getPlayerName } from "../../modules";

export function PlayerName() {
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        async function fetchPlayerName() {
            const playerName = await getPlayerName();
            setPlayerName(playerName || "Not set");
        }

        fetchPlayerName();
    });

    return (
        <span className="lead">
            <i className="bi bi-person-circle me-2 text-react"></i>
            {playerName}
        </span>
    );
}
