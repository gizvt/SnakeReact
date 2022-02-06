export enum Sound {
    PelletEaten = "PelletEaten.ogg",
    GameOver = "GameOver.ogg",
}

export class AudioPlayer {
    audio: HTMLAudioElement = new Audio();

    constructor(public isEnabled: boolean = false) {}

    play(sound: Sound) {
        if (this.isEnabled) {
            this.audio.src = sound;
            this.audio.play();
        }
    }

    init() {
        document.addEventListener("PlayAudio", ((event: CustomEvent<Sound>) => {
            this.play(event.detail);
        }) as EventListener);
    }
}
