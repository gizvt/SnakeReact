import { GameMode } from "..";

const settingsKey = "settings";
const playerNameKey = "playerName";

export const defaultSettings: Settings = {
    volume: 1,
    gameMode: "classic",
};

export interface Settings {
    volume: number;
    gameMode: GameMode;
}

export async function getSettings() {
    const settings = localStorage.getItem(settingsKey);

    if (settings) {
        return JSON.parse(settings) as Settings;
    }

    return defaultSettings;
}

export async function saveSettings(settings: Settings) {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
}

export async function getPlayerName() {
    return localStorage.getItem(playerNameKey);
}

export async function savePlayerName(playerName: string) {
    localStorage.setItem(playerNameKey, playerName);
}
