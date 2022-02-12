import { Direction } from "../direction";
import { Pellet } from "../pellet";
import { Point } from "../point";
import { ClassicSnake } from "../snake/classic-snake";
import { PortalSnake } from "../snake/portal-snake";
import { Snake } from "../snake/snake";
import { WrapSnake } from "../snake/wrap-snake";

export abstract class Board {
    public snake: Snake | null = null;

    constructor(public readonly size: number) {}

    get isInIllegalState() {
        return (
            this.snake &&
            (!this.containsPoint(this.snake.peekHead()) ||
                this.snake.hasCollidedWithSelf())
        );
    }

    public abstract moveSnake(direction: Direction): void;

    spawnSnake(wrapEnabled: boolean) {
        let centrePoint = Point.inCentreOf(this.size);

        const points = [
            centrePoint.move(Direction.Left),
            centrePoint,
            centrePoint.move(Direction.Right),
        ];

        this.snake = new PortalSnake(points);

        // switch (wrapEnabled) {
        //     case true:
        //         this.snake = new WrapSnake(points);
        //         break;
        //     case false:
        //         this.snake = new ClassicSnake(points);
        //         break;
        //     default:
        //         this.snake = new PortalSnake(points);
        // }
    }

    protected getEmptyPoint() {
        let point: Point;
        do {
            point = Point.random(this.size);
        } while (this.snake?.containsPoint(point));

        return point;
    }

    protected containsPoint(point: Point) {
        return !point.isOutOfBounds(this.size);
    }

    get area() {
        return Math.pow(this.size, 2);
    }
}
