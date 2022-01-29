import { Point } from "./point";

export class Pellet {
    private readonly _point: Point;

    constructor(point: Point) {
        this._point = point;
    }

    /**
     * Returns a deep copy of the Pellet's Point.
     */
    public get points() {
        return JSON.parse(JSON.stringify(this._point));
    }
}