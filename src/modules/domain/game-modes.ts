export type GameMode = "classic" | "wrap" | "portal";
export interface Config {
    numberOfPellets: number;
    speed: number;
}

export const gameModeConfig: Record<GameMode, Config> = {
    classic: { numberOfPellets: 1, speed: 85 },
    wrap: { numberOfPellets: 1, speed: 85 },
    portal: { numberOfPellets: 2, speed: 100 },
};
