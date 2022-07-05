import { pelletEatenSounds, Sound } from "..";
import { Direction } from "./direction";
import { GameMode } from "./game-modes";
import { Point } from "./point";

export class Snake {
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
        return this._points.some((point) => point.equals(other));
    }

    public hasCollidedWithSelf() {
        return this._points.filter((p) => p.equals(this.peekHead())).length > 1;
    }

    public spawnNewHead(newHead: Point) {
        this._points.unshift(newHead);
    }

    public popTail() {
        return this._points.pop();
    }

    public changeDirection(newDirection: Direction) {
        if (
            newDirection !== Direction.None &&
            !this._direction.isOppositeTo(newDirection)
        ) {
            this._direction = newDirection;
        }
    }

    public swapDirection() {
        const tail = this.peekTail();
        const penultimate = this.peekPenultimate();

        // If moving the tail in one direction finds a match, the points are
        // adjacent. If it does not, then wrap is enabled and they are on
        // opposite sides of the board.
        if (tail.isInSameRowAs(penultimate)) {
            if (tail.move(Direction.Left).equals(penultimate)) {
                this._direction = Direction.Right;
            } else if (tail.move(Direction.Right).equals(penultimate)) {
                this._direction = Direction.Left;
            } else if (tail.x > penultimate.x) {
                this._direction = Direction.Left;
            } else {
                this._direction = Direction.Right;
            }
        } else if (tail.isInSameColumnAs(penultimate)) {
            if (tail.move(Direction.Up).equals(penultimate)) {
                this._direction = Direction.Down;
            } else if (tail.move(Direction.Down).equals(penultimate)) {
                this._direction = Direction.Up;
            } else if (tail.y > penultimate.y) {
                this._direction = Direction.Up;
            } else {
                this._direction = Direction.Down;
            }
        }
    }

    public eatPellet(gameMode: GameMode) {
        document.dispatchEvent(
            new CustomEvent("PlayAudio", {
                detail: pelletEatenSounds[gameMode] || Sound.PelletEaten,
            })
        );

        this._pelletsEaten++;
    }

    private peekTail() {
        return this._points[this._points.length - 1];
    }

    private peekPenultimate() {
        return this._points[this._points.length - 2];
    }
}
