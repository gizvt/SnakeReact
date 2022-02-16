interface Props {
    score: number;
}

export function Score(props: Props) {
    return (
        <span className="lead">
            <i className="bi bi-gem me-2 text-react"></i>Score: {props.score}
        </span>
    );
}
