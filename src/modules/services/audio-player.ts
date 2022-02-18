export enum Sound {
    PelletEaten = "PelletEaten.ogg",
    GameOver = "GameOver.ogg",
}

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
