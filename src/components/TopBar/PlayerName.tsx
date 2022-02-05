import { useEffect, useState } from "react";

export function PlayerName() {
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        async function fetchPlayerName() {
            const playerName = await getPlayerName();
            setPlayerName(playerName || "Not set");
        }

        fetchPlayerName();
    });

    return <h3>{playerName}</h3>;
}

async function getPlayerName() {
    return localStorage.getItem("playerName");
}
