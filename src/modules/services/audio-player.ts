import { GameMode } from "../domain/game-modes";

export enum Sound {
    PelletEaten = "Ding.ogg",
    PortalTaken = "Whoosh.ogg",
    Rebounded = "Ping.ogg",
    GameOver = "GameOver.ogg",
}

export const pelletEatenSounds: Record<GameMode, Sound> = {
    classic: Sound.PelletEaten,
    wrap: Sound.PelletEaten,
    portal: Sound.PortalTaken,
    rebound: Sound.Rebounded,
    feast: Sound.PelletEaten,
};

export class AudioPlayer {
    constructor(public isEnabled: boolean = false) {}

    play(sound: Sound) {
        if (this.isEnabled) {
            new Audio(sound).play();
        }
    }

    init() {
        document.addEventListener("PlayAudio", ((event: CustomEvent<Sound>) => {
            this.play(event.detail);
        }) as EventListener);
    }
}
