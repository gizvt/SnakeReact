import { Direction } from "../domain/direction";

class InputHandler {
    private readonly inputQueue: Direction[] = [];

    public get nextDirection() {
        const nextDirection = this.inputQueue.shift() || Direction.None;
        return nextDirection;
    }

    public setNextDirection(
        inputDirection: Direction,
        snakeDirection: Direction
    ) {
        if (!Direction.AllDirections.includes(inputDirection)) {
            // Don't add if the input direction doesn't exist.
            return;
        }

        // If there is no next direction...
        if (this.inputQueue.length === 0) {
            // ...don't record the input direction if it is opposite or equal to the snake's current direction.
            if (snakeDirection.isOppositeOrEqualTo(inputDirection)) {
                return;
            }
            // Else if there IS a next direction...
        } else if (this.inputQueue.length > 0) {
            // ...don't record the input direction it if it is opposite or equal to the next direction.
            if (this.inputQueue[0].isOppositeOrEqualTo(inputDirection)) {
                return;
            }
        }

        // Only maintain a buffer of two input directions at once.
        if (this.inputQueue.length === 2) {
            this.inputQueue.shift();
        }

        this.inputQueue.push(inputDirection);
    }
}

export default new InputHandler();
