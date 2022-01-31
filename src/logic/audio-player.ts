export enum Sound {
    PelletEaten = "PelletEaten.ogg",
    GameOver = "GameOver.ogg",
}

export class AudioPlayer {
    isEnabled: boolean = true;
    audio: HTMLAudioElement = new Audio();

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
