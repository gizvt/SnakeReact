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
    constructor(public volume: number = 1) {}

    play(sound: Sound) {
        if (this.volume > 0) {
            const audio = new Audio(sound);
            audio.volume = this.volume;
            audio.play();
        }
    }

    init() {
        document.addEventListener("PlayAudio", ((event: CustomEvent<Sound>) => {
            this.play(event.detail);
        }) as EventListener);
    }
}
