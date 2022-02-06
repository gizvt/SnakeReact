import { Point } from "./point";

export class Pellet {
    private readonly _point: Point;

    constructor(point: Point) {
        this._point = point;
    }

    public get point() {
        return this._point;
    }
}
