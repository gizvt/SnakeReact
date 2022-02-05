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
        <span className="lead">
            <i className="bi bi-person-circle text-primary me-2"></i>
            {playerName}
        </span>
    );
}

async function getPlayerName() {
    return localStorage.getItem("playerName");
}
