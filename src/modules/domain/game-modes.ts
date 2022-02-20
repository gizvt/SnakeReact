interface Config {
    numberOfPellets: number;
    respawnAllPellets: boolean;
    speed: number;
    boardSize: number;
}

export type GameMode = "classic" | "wrap" | "portal" | "rebound" | "feast";

export const gameModeConfig: Record<GameMode, Config> = {
    classic: {
        numberOfPellets: 1,
        respawnAllPellets: true,
        speed: 85,
        boardSize: 15,
    },
    wrap: {
        numberOfPellets: 1,
        respawnAllPellets: true,
        speed: 85,
        boardSize: 15,
    },
    portal: {
        numberOfPellets: 2,
        respawnAllPellets: true,
        speed: 100,
        boardSize: 15,
    },
    rebound: {
        numberOfPellets: 1,
        respawnAllPellets: true,
        speed: 100,
        boardSize: 15,
    },
    feast: {
        numberOfPellets: 3,
        respawnAllPellets: false,
        speed: 85,
        boardSize: 15,
    },
};

export function isGameMode(value: unknown): value is GameMode {
    const gameMode = value as GameMode;

    return (
        gameMode === "classic" ||
        gameMode === "wrap" ||
        gameMode === "portal" ||
        gameMode === "rebound" ||
        gameMode === "feast"
    );
}
