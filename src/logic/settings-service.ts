const key = "settings";

export const defaultSettings: Settings = {
    wrapEnabled: false,
    audioEnabled: true,
};

export interface Settings {
    wrapEnabled: boolean;
    audioEnabled: boolean;
}

export async function getSettings() {
    const settings = localStorage.getItem(key);

    if (settings) {
        return JSON.parse(settings) as Settings;
    }

    return defaultSettings;
}

export async function saveSettings(settings: Settings) {
    localStorage.setItem(key, JSON.stringify(settings));
}
