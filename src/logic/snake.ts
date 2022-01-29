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

    /**
     * Returns a deep copy of the Snake's Points.
     */
    public get points() {
        return this._points.map((point) => {
            const deepCopy = JSON.stringify(point);
            return JSON.parse(deepCopy) as Point;
        });
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

    public get length(): number {
        return this._points.length;
    }
}
