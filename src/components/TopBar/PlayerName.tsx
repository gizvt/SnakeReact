import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

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
        <h4>
            <i className="bi bi-person-circle text-primary me-2"></i>
            {playerName}
        </h4>
    );
}

async function getPlayerName() {
    return localStorage.getItem("playerName");
}
