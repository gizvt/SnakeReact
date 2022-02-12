import { Direction } from "../direction";
import { Pellet } from "../pellet";
import { Board } from "./board";

export class SinglePelletBoard extends Board {
    public pellet: Pellet | null = null;

    spawnPellet() {
        if (!this.snake) {
            throw new Error(
                "Cannot spawn a Pellet without first spawning a Snake."
            );
        }

        this.pellet = new Pellet(this.getEmptyPoint());
    }

    public moveSnake(direction: Direction) {
        this.snake?.move(direction, [this.pellet!], this.size);

        if (this.snake?.pelletEaten) {
            this.spawnPellet();
        }
    }

    reset() {
        this.pellet = null;
        this.snake = null;
    }
}
