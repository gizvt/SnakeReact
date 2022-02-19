import { gameModeConfig } from "..";
import { Direction } from "./direction";
import { GameMode } from "./game-modes";
import { Pellet } from "./pellet";
import { Point } from "./point";
import { Snake } from "./snake";

export class Board {
    public snake: Snake = new Snake([]);
    public pellets: Pellet[] = [];

    constructor(public readonly size: number, private gameMode: GameMode) {}

    get isInIllegalState() {
        return (
            this.snake &&
            (!this.containsPoint(this.snake.peekHead()) ||
                this.snake.hasCollidedWithSelf())
        );
    }

    public moveSnake(direction: Direction) {
        this.snake.changeDirection(direction);
        let newHeadPoint = this.getNewHeadPoint();
        this.snake.spawnNewHead(newHeadPoint);

        const pelletEaten = this.pellets.some((p) =>
            p.point.equals(newHeadPoint)
        );

        if (pelletEaten) {
            if (this.gameMode === "portal") {
                const [first, second] = this.pellets;

                newHeadPoint = newHeadPoint.equals(first.point)
                    ? second.point
                    : newHeadPoint.equals(second.point)
                    ? first.point
                    : newHeadPoint;

                this.snake.spawnNewHead(newHeadPoint);
            } else if (this.gameMode === "rebound") {
                this.snake.swapDirection();
                this.snake.points.reverse();
            }

            this.snake.eatPellet();
            this.spawnPellets(gameModeConfig[this.gameMode].numberOfPellets);
        }

        if (!pelletEaten || this.gameMode === "portal") {
            // Always pop the tail in Portal mode as two heads are spawned
            // when a pellet is eaten to achieve the desired warping behaviour
            // (one on both of the pellets).
            this.snake.popTail();
        }
    }

    private getNewHeadPoint() {
        let newHeadPoint = this.snake.peekHead().move(this.snake.direction);

        if (this.gameMode === "wrap" || this.gameMode === "portal") {
            return newHeadPoint.isOutOfBounds(this.size)
                ? newHeadPoint.wrap(this.snake.direction, this.size)
                : newHeadPoint;
        }

        return newHeadPoint;
    }

    public spawnPellets(number: number) {
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

    public spawnSnake() {
        let centrePoint = Point.inCentreOf(this.size);

        const points = [
            centrePoint.move(Direction.Left),
            centrePoint,
            centrePoint.move(Direction.Right),
        ];

        this.snake = new Snake(points);
    }

    public reset() {
        this.pellets = [];
        this.snake = new Snake([]);
    }

    private getEmptyPoint() {
        let point: Point;
        do {
            point = Point.random(this.size);
        } while (this.snake?.containsPoint(point));

        return point;
    }

    private containsPoint(point: Point) {
        return !point.isOutOfBounds(this.size);
    }

    get area() {
        return Math.pow(this.size, 2);
    }
}
