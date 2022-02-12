import { Direction } from "../direction";
import { Pellet } from "../pellet";
import { Point } from "../point";
import { Board } from "./board";

export class MultiPelletBoard extends Board {
    public pellets: Pellet[] | null = null;

    spawnPellets(number: number) {
        if (!this.snake) {
            throw new Error(
                "Cannot spawn a Pellet without first spawning a Snake."
            );
        }

        const alreadySpawned = (point: Point) =>
            pellets.some((pellet) => pellet.point.equals(point));

        let pellets: Pellet[] = [];
        for (let i = 0; i < number; i++) {
            let point: Point;
            do {
                point = this.getEmptyPoint();
            } while (alreadySpawned(point));
            pellets.push(new Pellet(point));
        }

        this.pellets = pellets;
    }

    public moveSnake(direction: Direction) {
        this.snake?.move(direction, this.pellets!, this.size);

        if (this.snake?.pelletEaten) {
            this.spawnPellets(2);
        }
    }

    reset() {
        this.pellets = null;
        this.snake = null;
    }
}
