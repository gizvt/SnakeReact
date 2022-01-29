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

    private getSnakeSpawnPoints() {
        let centrePoint = Point.inCentreOf(this.size);

        const points = [
            centrePoint.move(Direction.Left),
            centrePoint,
            centrePoint.move(Direction.Right),
        ];

        return points;
    }

    getRandomPoint() {
        return Point.random(this.size);
    }

    public moveSnake(direction: Direction) {
        this.snake?.move(direction, this.pellet!.point);

        if (this.snake?.pelletEaten) {
            this.spawnPellet();
        }
    }

    spawnSnake() {
        const snakePoints = this.getSnakeSpawnPoints();
        this.snake = new Snake(snakePoints);
    }

    spawnPellet() {
        if (!this.snake) {
            throw new Error(
                "Cannot spawn a Pellet without first spawning a Snake."
            );
        }

        let pelletPoint: Point;
        do {
            pelletPoint = this.getRandomPoint();
        } while (this.snake.containsPoint(pelletPoint));

        this.pellet = new Pellet(pelletPoint);
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
