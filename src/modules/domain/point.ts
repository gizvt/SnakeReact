import { Direction } from "./direction";

export class Point {
    constructor(public readonly x: number, public readonly y: number) {}

    equals(other: Point) {
        return this.x === other.x && this.y === other.y;
    }

    toString() {
        return `${this.x},${this.y}`;
    }

    isOutOfBounds(boardSize: number) {
        return (
            this.x < 0 ||
            this.y < 0 ||
            this.x >= boardSize ||
            this.y >= boardSize
        );
    }

    isWithinViewport = (boardSize: number, viewport: number) => {
        const edge = (boardSize - viewport) / 2;
        const lowerLimit = 0 + edge;
        const upperLimit = lowerLimit + viewport - 1;

        return (
            this.x >= lowerLimit &&
            this.x <= upperLimit &&
            this.y >= lowerLimit &&
            this.y <= upperLimit
        );
    };

    isInSameRowAs(other: Point) {
        return this.y === other.y;
    }

    isInSameColumnAs(other: Point) {
        return this.x === other.x;
    }

    adjustToViewport(boardSize: number, viewport: number) {
        if (viewport !== boardSize) {
            const edge = (boardSize - viewport) / 2;
            return new Point(this.x - edge, this.y - edge);
        }

        return new Point(this.x, this.y);
    }

    move(direction: Direction) {
        let x = this.x;
        let y = this.y;

        switch (direction) {
            case Direction.Up:
                y--;
                break;
            case Direction.Down:
                y++;
                break;
            case Direction.Left:
                x--;
                break;
            case Direction.Right:
                x++;
                break;
        }

        return new Point(x, y);
    }

    wrap(direction: Direction, boardSize: number): Point {
        if (!this.isOutOfBounds(boardSize)) {
            return this;
        }

        let x = this.x;
        let y = this.y;

        switch (direction) {
            case Direction.Up:
                y += boardSize;
                break;
            case Direction.Down:
                y -= boardSize;
                break;
            case Direction.Left:
                x += boardSize;
                break;
            case Direction.Right:
                x -= boardSize;
                break;
        }

        return new Point(x, y);
    }

    static inCentreOf(boardSize: number): Point {
        let centre = Math.ceil(boardSize / 2) - 1;
        return new Point(centre, centre);
    }

    static random(boardSize: number): Point {
        let x = Math.floor(Math.random() * boardSize);
        let y = Math.floor(Math.random() * boardSize);
        return new Point(x, y);
    }
}
