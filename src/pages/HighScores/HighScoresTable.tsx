import { Alert, Table } from "react-bootstrap";
import { HighScore } from "../../modules";

interface Props {
    highScores: HighScore[];
}

export function HighScoresTable(props: Props) {
    if (!props.highScores.length) {
        return (
            <Alert variant="primary">
                No high scores have been recorded for this game mode :(
            </Alert>
        );
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Player Name</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {props.highScores
                    .sort(strongestFirst)
                    .map((highScore, index) => (
                        <tr key={highScore.id}>
                            <td className="text-center">{getMedal(index)}</td>
                            <td>{index + 1}</td>
                            <td>{highScore.playerName}</td>
                            <td>{highScore.score}</td>
                            <td>{new Date(highScore.date).toLocaleString()}</td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

const getMedal = (index: number) =>
    index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;

const strongestFirst = (a: HighScore, b: HighScore) =>
    b.score > a.score || (b.score === a.score && b.date < a.date) ? 1 : -1;
