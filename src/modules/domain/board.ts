import { Direction } from "./direction";
import { GameMode, gameModeConfig } from "./game-modes";
import { Pellet } from "./pellet";
import { Point } from "./point";
import { Snake } from "./snake";

export class Board {
    public snake: Snake = new Snake([]);
    public pellets: Pellet[] = [];
    private config = gameModeConfig[this.gameMode];

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

            this.snake.eatPellet(this.gameMode);
            this.spawnPellets();
        }

        if (!pelletEaten || this.gameMode === "portal") {
            // Always pop the tail in Portal mode as two heads are spawned
            // when a pellet is eaten to achieve the desired warping behaviour
            // (one on both of the pellets).
            this.snake.popTail();
        }

        if (this.gameMode === "infinity") {
            // Readjust the board to give the desired illusion.
            this.shiftAllPoints(this.snake.direction.getOpposite());
        }
    }

    private shiftAllPoints(direction: Direction) {
        this.shiftPellets(direction);
        this.shiftSnake(direction);
    }

    private shiftSnake(direction: Direction) {
        this.snake.points.forEach((point, i) => {
            const newPoint = point.move(direction);

            if (this.config.wrap && newPoint.isOutOfBounds(this.size)) {
                this.snake.points[i] = newPoint.wrap(direction, this.size);
            } else {
                this.snake.points[i] = newPoint;
            }
        });
    }

    private shiftPellets(direction: Direction) {
        const newPelletPoints = this.pellets.map((pellet) => {
            const newPelletPoint = pellet.point.move(direction);

            if (this.config.wrap) {
                return newPelletPoint.isOutOfBounds(this.size)
                    ? newPelletPoint.wrap(direction, this.size)
                    : newPelletPoint;
            }

            return newPelletPoint;
        });

        this.pellets = newPelletPoints.map((point) => new Pellet(point));
    }

    private getNewHeadPoint() {
        let newHeadPoint = this.snake.peekHead().move(this.snake.direction);

        if (this.config.wrap) {
            return newHeadPoint.isOutOfBounds(this.size)
                ? newHeadPoint.wrap(this.snake.direction, this.size)
                : newHeadPoint;
        }

        return newHeadPoint;
    }

    public spawnPellets() {
        if (!this.snake) {
            throw new Error(
                "Cannot spawn a Pellet without first spawning a Snake."
            );
        }

        const alreadySpawned = (newPoint: Point) =>
            pellets.some((pellet) => pellet.point.equals(newPoint));

        // If respawnAllPellets is false, kepp any pellets that do not occupy
        // the same point as the snake's head (that one has just been eaten).
        let pellets: Pellet[] = this.config.respawnAllPellets
            ? []
            : this.pellets.filter(
                  (p) => !p.point.equals(this.snake.peekHead())
              );

        // Fill the pellets array up to the permitted number of pellets.
        for (let i = pellets.length; i < this.config.numberOfPellets; i++) {
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
            centrePoint,
            centrePoint.move(Direction.Right),
            centrePoint.move(Direction.Right).move(Direction.Right),
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
        } while (this.snake.containsPoint(point));

        return point;
    }

    private containsPoint(point: Point) {
        return !point.isOutOfBounds(this.size);
    }

    get area() {
        return Math.pow(this.size, 2);
    }
}
