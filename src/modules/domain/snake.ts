import { Sound } from "../services/audio-player";
import { Direction } from "./direction";
import { Point } from "./point";

export class Snake {
    private _direction: Direction = Direction.Left;
    private readonly _points: Point[];
    private _pelletsEaten = 0;
    private _pelletEaten = false;

    constructor(points: Point[], private readonly wrapEnabled: boolean) {
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

    public move(direction: Direction, pelletPoint: Point, boardSize: number) {
        this.changeDirection(direction);
        let newHeadPoint = this.peekHead().move(this.direction);

        if (this.wrapEnabled && newHeadPoint.isOutOfBounds(boardSize)) {
            newHeadPoint = newHeadPoint.wrap(this._direction, boardSize);
        }

        if (newHeadPoint.equals(pelletPoint)) {
            document.dispatchEvent(
                new CustomEvent("PlayAudio", { detail: Sound.PelletEaten })
            );

            this._pelletsEaten++;
            this._pelletEaten = true;
        } else {
            this.popTail();
            this._pelletEaten = false;
        }

        this.spawnNewHead(newHeadPoint);
    }

    private spawnNewHead(newHead: Point) {
        this._points.unshift(newHead);
    }

    private popTail() {
        return this._points.pop();
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
