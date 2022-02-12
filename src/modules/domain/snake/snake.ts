import { Direction } from "../direction";
import { Pellet } from "../pellet";
import { Point } from "../point";

export abstract class Snake {
    protected _direction: Direction = Direction.Left;
    protected readonly _points: Point[];
    protected _pelletsEaten = 0;
    protected _pelletEaten = false;

    constructor(points: Point[]) {
        this._points = points;
    }

    public get pelletEaten() {
        return this._pelletEaten;
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

    public get pelletsEaten() {
        return this._pelletsEaten;
    }

    public get points() {
        return this._points;
    }

    public peekHead() {
        return this._points[0];
    }

    public containsPoint(other: Point) {
        return this._points.find((point) => point.equals(other));
    }

    public hasCollidedWithSelf() {
        return this._points.filter((p) => p.equals(this.peekHead())).length > 1;
    }

    public abstract move(
        direction: Direction,
        pellets: Pellet[],
        boardSize: number
    ): void;

    protected spawnNewHead(newHead: Point) {
        this._points.unshift(newHead);
    }

    protected popTail() {
        return this._points.pop();
    }

    protected changeDirection(newDirection: Direction) {
        if (
            newDirection !== Direction.None &&
            !this.direction.isOppositeTo(newDirection)
        ) {
            this.direction = newDirection;
        }
    }
}
