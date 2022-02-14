import { Sound } from "../..";
import { Direction } from "../direction";
import { Pellet } from "../pellet";
import { Point } from "../point";
import { Snake } from "./snake";

export class WrapSnake extends Snake {
    public move(
        direction: Direction,
        pellets: Pellet[],
        boardSize: number
    ): void {
        this.changeDirection(direction);
        let newHeadPoint = this.peekHead().move(this._direction);

        if (newHeadPoint.isOutOfBounds(boardSize)) {
            newHeadPoint = newHeadPoint.wrap(this._direction, boardSize);
        }

        if (pellets.some((p) => p.point.equals(newHeadPoint))) {
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
}