import { Sound } from "../services/audio-player";

interface Config {
    numberOfPellets: number;
    respawnAllPellets: boolean;
    speed: number;
    boardSize: number;
    wrap: boolean;
}

export type GameMode =
    | "classic"
    | "wrap"
    | "portal"
    | "rebound"
    | "feast"
    | "infinity";

export const allGameModes: GameMode[] = [
    "classic",
    "feast",
    "portal",
    "rebound",
    "wrap",
    "infinity",
];

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
    infinity: {
        numberOfPellets: 1,
        respawnAllPellets: true,
        speed: 100,
        boardSize: 15,
        wrap: true,
    },
};

export const pelletEatenSounds: Record<GameMode, Sound> = {
    classic: Sound.PelletEaten,
    wrap: Sound.PelletEaten,
    portal: Sound.PortalTaken,
    rebound: Sound.Rebounded,
    feast: Sound.PelletEaten,
    infinity: Sound.PelletEaten,
};

export function isGameMode(value: unknown): value is GameMode {
    const gameMode = value as GameMode;
    return allGameModes.includes(gameMode);
}
