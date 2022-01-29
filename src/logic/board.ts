import { Direction } from "./direction";
import { Pellet } from "./pellet";
import { Point } from "./point";
import { Snake } from "./snake";

export class Board {
    constructor(
        public readonly size: number,
        public readonly snake?: Snake,
        public readonly pellet?: Pellet
    ) {}

    get isInIllegalState() {
        return (
            this.snake &&
            (this.containsPoint(this.snake?.peekHead()) ||
                this.snake.hasCollidedWithSelf())
        );
    }

    getSnakeSpawnPoints() {
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

    private containsPoint(point: Point) {
        return point.isOutOfBounds(this.size);
    }

    get area() {
        return Math.pow(this.size, 2);
    }
}
