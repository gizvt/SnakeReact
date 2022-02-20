interface Config {
    numberOfPellets: number;
    respawnAllPellets: boolean;
    speed: number;
    boardSize: number;
    wrap: boolean;
}

export type GameMode = "classic" | "wrap" | "portal" | "rebound" | "feast";

export const gameModeConfig: Record<GameMode, Config> = {
    classic: {
        numberOfPellets: 1,
        respawnAllPellets: true,
        speed: 85,
        boardSize: 15,
        wrap: false,
    },
    wrap: {
        numberOfPellets: 1,
        respawnAllPellets: true,
        speed: 85,
        boardSize: 15,
        wrap: true,
    },
    portal: {
        numberOfPellets: 2,
        respawnAllPellets: true,
        speed: 100,
        boardSize: 15,
        wrap: true,
    },
    rebound: {
        numberOfPellets: 1,
        respawnAllPellets: true,
        speed: 100,
        boardSize: 15,
        wrap: true,
    },
    feast: {
        numberOfPellets: 3,
        respawnAllPellets: false,
        speed: 85,
        boardSize: 15,
        wrap: false,
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
