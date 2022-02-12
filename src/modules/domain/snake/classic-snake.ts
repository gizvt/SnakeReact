import { Sound } from "../..";
import { Direction } from "../direction";
import { Point } from "../point";
import { Snake } from "./snake";

export class ClassicSnake extends Snake {
    public move(direction: Direction, pelletPoint: Point): void {
        this.changeDirection(direction);
        let newHeadPoint = this.peekHead().move(this._direction);

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
}
