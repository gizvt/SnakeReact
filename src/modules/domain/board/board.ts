import { Direction } from "../direction";
import { GameMode } from "../game-modes";
import { Pellet } from "../pellet";
import { Point } from "../point";
import { ClassicSnake } from "../snake/classic-snake";
import { PortalSnake } from "../snake/portal-snake";
import { Snake } from "../snake/snake";
import { WrapSnake } from "../snake/wrap-snake";

export class Board {
    public snake: Snake | null = null;
    public pellets: Pellet[] | null = null;

    constructor(
        public readonly size: number,
        public numberOfPellets: number = 1
    ) {}

    get isInIllegalState() {
        return (
            this.snake &&
            (!this.containsPoint(this.snake.peekHead()) ||
                this.snake.hasCollidedWithSelf())
        );
    }

    public moveSnake(direction: Direction) {
        this.snake?.move(direction, this.pellets!, this.size);

        if (this.snake?.pelletEaten) {
            this.spawnPellets(this.numberOfPellets);
        }
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

    public spawnSnake(gameMode: GameMode) {
        let centrePoint = Point.inCentreOf(this.size);

        const points = [
            centrePoint.move(Direction.Left),
            centrePoint,
            centrePoint.move(Direction.Right),
        ];

        switch (gameMode) {
            case "classic":
                this.snake = new ClassicSnake(points);
                break;
            case "wrap":
                this.snake = new WrapSnake(points);
                break;
            case "portal":
                this.snake = new PortalSnake(points);
                break;
            default:
                throw new Error("Unrecognised game mode.");
        }
    }

    public reset() {
        this.pellets = null;
        this.snake = null;
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
