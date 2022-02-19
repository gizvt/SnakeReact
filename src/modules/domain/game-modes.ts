interface Config {
    numberOfPellets: number;
    speed: number;
    boardSize: number;
}

export type GameMode = "classic" | "wrap" | "portal";

export const gameModeConfig: Record<GameMode, Config> = {
    classic: { numberOfPellets: 1, speed: 85, boardSize: 15 },
    wrap: { numberOfPellets: 1, speed: 85, boardSize: 15 },
    portal: { numberOfPellets: 2, speed: 100, boardSize: 15 },
};

export function isGameMode(value: unknown): value is GameMode {
    const gameMode = value as GameMode;

    return (
        gameMode === "classic" || gameMode === "wrap" || gameMode === "portal"
    );
}
