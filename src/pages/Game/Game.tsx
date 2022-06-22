import { useSearchParams } from "react-router-dom";
import { Board, GameOverModal, HighScoreToast } from "../../components";
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
        boardSize,
        snakeCoords,
        pelletCoords,
        score,
        status,
        showHighScoreToast,
        setShowHighScoreToast,
        startGame,
        endGame,
    } = useGameState(gameMode);

    const handleStartGame = async () => await startGame();
    const handleGameOver = async () => await endGame();
    const handleToastClose = () => setShowHighScoreToast(false);

    return (
        <>
            <GameOverModal
                show={status === "GameOver"}
                score={score}
                handleClose={handleGameOver}
            />
            <HighScoreToast
                show={showHighScoreToast}
                score={score}
                handleClose={handleToastClose}
            />
            <TopBar
                gameStatus={status}
                score={score}
                spinLogo={status === "InProgress"}
            />
            <Board
                size={boardSize}
                pelletCoords={pelletCoords}
                snakeCoords={snakeCoords}
            ></Board>
            <BottomBar
                handleStartGame={handleStartGame}
                disableStartButton={status !== "Idle"}
            ></BottomBar>
        </>
    );
}
