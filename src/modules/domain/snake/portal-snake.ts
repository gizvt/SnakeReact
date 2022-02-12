import { Sound } from "../..";
import { Direction } from "../direction";
import { Pellet } from "../pellet";
import { Point } from "../point";
import { Snake } from "./snake";

export class PortalSnake extends Snake {
    public move(direction: Direction, pellets: Pellet[]): void {
        this.changeDirection(direction);
        let newHeadPoint = this.peekHead().move(this._direction);
        const [first, second] = pellets.map((p) => p.point);

        if (pellets.some((p) => p.point.equals(newHeadPoint))) {
            // Warp the new head to the Pellet that wasn't eaten.
            newHeadPoint = newHeadPoint.equals(first) ? second : first;

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
