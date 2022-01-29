import { Direction } from "./direction";
import { Point } from "./point";

export class Snake {
    private _direction: Direction = Direction.Left;
    private readonly _points: Point[];

    constructor(points: Point[]) {
        this._points = points;
    }

    public get direction() {
        return this._direction;
    }

    public set direction(newDirection: Direction) {
        if (
            newDirection !== Direction.None &&
            !this._direction.isOppositeTo(newDirection)
        ) {
            this._direction = newDirection;
        }
    }

    public get points() {
        return this._points;
    }

    private popTail() {
        return this._points.pop();
    }

    public peekHead() {
        return this._points[0];
    }

    private spawnNewHead(newHead: Point) {
        this._points.unshift(newHead);
    }

    public containsPoint(other: Point) {
        return this._points.find((point) => point.equals(other));
    }

    public hasCollidedWithSelf() {
        return this._points.filter((p) => p.equals(this.peekHead())).length > 1;
    }

    public move(direction: Direction) {
        this.changeDirection(direction);
        this.popTail();
        let newHead = this.peekHead().move(this.direction);
        this.spawnNewHead(newHead);
    }

    public get length(): number {
        return this._points.length;
    }

    private changeDirection(newDirection: Direction) {
        if (
            newDirection !== Direction.None &&
            !this.direction.isOppositeTo(newDirection)
        ) {
            this.direction = newDirection;
        }
    }
}
