import { GameMode } from "../domain/game-modes";
import { getSettings } from "./settings-service";

export enum Sound {
    PelletEaten = "Ding.ogg",
    PortalTaken = "Whoosh.ogg",
    Rebounded = "Ping.ogg",
    GameOver = "GameOver.ogg",
    Click = "Click.ogg",
}

export const pelletEatenSounds: Record<GameMode, Sound> = {
    classic: Sound.PelletEaten,
    wrap: Sound.PelletEaten,
    portal: Sound.PortalTaken,
    rebound: Sound.Rebounded,
    feast: Sound.PelletEaten,
};

export class AudioPlayer {
    private readonly clickyNodeNames = ["BUTTON", "A", "SELECT", "INPUT"];

    private async getVolume() {
        return (await getSettings()).volume;
    }

    constructor(public volume: number = 1) {}

    async play(sound: Sound) {
        if (this.volume > 0) {
            const audio = new Audio(sound);
            audio.volume = await this.getVolume();
            console.log("playing");
            audio.play();
        }
    }

    init() {
        document.addEventListener("PlayAudio", ((event: CustomEvent<Sound>) => {
            this.play(event.detail);
        }) as EventListener);

        document.addEventListener("click", ({ target }) => {
            if (
                target instanceof HTMLElement &&
                this.clickyNodeNames.includes(target.nodeName)
            ) {
                this.play(Sound.Click);
            }
        });
    }
}
