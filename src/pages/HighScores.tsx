import { Col, Row } from "react-bootstrap";
import { HighScoresTabs } from "../components/HighScores/HighScoresTabs";
import { HighScoresTopBar } from "../components/HighScores/HighScoresTopBar";

export function HighScores() {
    return (
        <Row className="mt-5">
            <Col sm="8" className="mx-auto">
                <HighScoresTopBar />
                <HighScoresTabs />
            </Col>
        </Row>
    );
}
