export type GameMode = "classic" | "wrap" | "portal";
export interface GameConfig {
    numberOfPellets: number;
    speed: number;
}

export const gameSettings: Record<GameMode, GameConfig> = {
    classic: { numberOfPellets: 1, speed: 85 },
    wrap: { numberOfPellets: 1, speed: 85 },
    portal: { numberOfPellets: 2, speed: 100 },
};
