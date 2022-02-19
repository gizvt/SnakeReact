import { useSearchParams } from "react-router-dom";
import {
    Board as BoardComponent,
    GameOverModal,
    HighScoreToast,
} from "../../components";
import { useGameState } from "../../hooks/game-state";
import { isGameMode } from "../../modules";
import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";

export function Game() {
    const [searchParams] = useSearchParams();
    const gameMode = searchParams.get("mode");

    if (!isGameMode(gameMode)) {
        throw new Error("Unrecognised game mode.");
    }

    const {
        snakeCoords,
        pelletCoords,
        boardSize,
        score,
        status,
        showHighScoreToast,
        startGame,
        endGame,
    } = useGameState(gameMode);

    const handleStartGame = async () => await startGame();
    const handleGameOver = async () => await endGame();

    return (
        <>
            <GameOverModal
                show={status === "GameOver"}
                score={score}
                handleClose={handleGameOver}
            />
            {showHighScoreToast && <HighScoreToast score={score} />}
            <TopBar
                showTimer={status === "InProgress"}
                score={score}
                spinLogo={status === "InProgress"}
            />
            <BoardComponent
                size={boardSize}
                pelletCoords={pelletCoords}
                snakeCoords={snakeCoords}
            ></BoardComponent>
            <BottomBar
                handleStartGame={handleStartGame}
                disableStartButton={status !== "Idle"}
            ></BottomBar>
        </>
    );
}
