interface Props {
    score: number;
}

export function Score(props: Props) {
    return <h3>Score: {props.score}</h3>;
}
