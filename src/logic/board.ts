import { Direction } from "./direction";
import { Pellet } from "./pellet";
import { Point } from "./point";
import { Snake } from "./snake";

export class Board {
    constructor(
        public readonly size: number,
        public snake: Snake | null = null,
        public pellet: Pellet | null = null
    ) {}

    get isInIllegalState() {
        return (
            this.snake &&
            (!this.containsPoint(this.snake.peekHead()) ||
                this.snake.hasCollidedWithSelf())
        );
    }

    public moveSnake(direction: Direction) {
        this.snake?.move(direction, this.pellet!.point, this.size);

        if (this.snake?.pelletEaten) {
            this.spawnPellet();
        }
    }

    spawnSnake(wrapEnabled: boolean) {
        let centrePoint = Point.inCentreOf(this.size);

        const points = [
            centrePoint.move(Direction.Left),
            centrePoint,
            centrePoint.move(Direction.Right),
        ];

        this.snake = new Snake(points, wrapEnabled);
    }

    spawnPellet() {
        if (!this.snake) {
            throw new Error(
                "Cannot spawn a Pellet without first spawning a Snake."
            );
        }

        let point: Point;
        do {
            point = Point.random(this.size);
        } while (this.snake.containsPoint(point));

        this.pellet = new Pellet(point);
    }

    reset() {
        this.pellet = null;
        this.snake = null;
    }

    private containsPoint(point: Point) {
        return !point.isOutOfBounds(this.size);
    }

    get area() {
        return Math.pow(this.size, 2);
    }
}
