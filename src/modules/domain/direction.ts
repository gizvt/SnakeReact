export class Direction {
    static None = new Direction(0, []);
    static Left = new Direction(10, ["ArrowLeft", "a"]);
    static Up = new Direction(20, ["ArrowUp", "w"]);
    static Right = new Direction(30, ["ArrowRight", "d"]);
    static Down = new Direction(40, ["ArrowDown", "s"]);
    static AllDirections = [this.Left, this.Up, this.Right, this.Down];

    private constructor(
        private readonly id: number,
        private readonly keys: string[]
    ) {}

    isOppositeTo(other: Direction) {
        return this.id + other.id === 40 || this.id + other.id === 60;
    }

    isEqualTo(other: Direction) {
        return this.id === other.id;
    }

    isOppositeOrEqualTo(other: Direction) {
        return this.isOppositeTo(other) || this.isEqualTo(other);
    }

    getOpposite() {
        if (this.id - 20 <= 0) {
            return Direction.fromId(this.id + 20);
        }

        return Direction.fromId(this.id - 20);
    }

    static fromKey(key: string) {
        return (
            this.AllDirections.find((d) => d.keys.some((k) => k === key)) ||
            Direction.None
        );
    }

    static fromId(id: number) {
        return this.AllDirections.find((d) => d.id === id) || Direction.None;
    }
}
