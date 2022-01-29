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

    public popTail() {
        return this._points.pop();
    }

    public peekHead() {
        return this._points[0];
    }

    public spawnNewHead(newHead: Point) {
        this._points.unshift(newHead);
    }

    public containsPoint(other: Point) {
        return this._points.find((point) => point.equals(other));
    }

    public get length(): number {
        return this._points.length;
    }
}
