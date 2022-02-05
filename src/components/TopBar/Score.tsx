interface Props {
    score: number;
}

export function Score(props: Props) {
    return (
        <span className="lead">
            <i className="bi bi-gem text-primary me-2"></i>Score: {props.score}
        </span>
    );
}
