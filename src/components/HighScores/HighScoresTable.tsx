import { Table } from "react-bootstrap";
import { HighScore } from "../../modules";

interface Props {
    highScores: HighScore[];
}

export function HighScoresTable(props: Props) {
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
                {props.highScores.sort(strongestFirst).map((hs, index) => (
                    <tr>
                        <td className="text-center">{getMedal(index)}</td>
                        <td>{index + 1}</td>
                        <td>{hs.playerName}</td>
                        <td>{hs.score}</td>
                        <td>{new Date(hs.date).toLocaleString()}</td>
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
