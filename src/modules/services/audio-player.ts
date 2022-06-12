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

    private handlePlayAudio = ((event: CustomEvent<Sound>) => {
        this.play(event.detail);
    }) as EventListener;

    private handleClick = (event: Event) => {
        if (
            event.target instanceof HTMLElement &&
            this.clickyNodeNames.includes(event.target.nodeName)
        ) {
            this.play(Sound.Click);
        }
    };

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

    attachListeners() {
        document.addEventListener("PlayAudio", this.handlePlayAudio);
        document.addEventListener("click", this.handleClick);
    }

    detachListeners() {
        document.removeEventListener("PlayAudio", this.handlePlayAudio);
        document.removeEventListener("click", this.handleClick);
    }
}
