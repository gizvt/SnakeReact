import {
    Board as BoardComponent,
    BottomBar,
    GameOverModal,
    HighScoreToast,
    TopBar,
} from "../components";
import { useGameState } from "./game-state";

export function GameFunc() {
    const {
        snakeCoords,
        pelletCoords,
        boardSize,
        score,
        status,
        showHighScoreToast,
        startGame,
        endGame,
    } = useGameState();

    const handleStartGame = async () => await startGame();
    const handleGameOver = async () => await endGame();

    return (
        <>
            <GameOverModal
                show={status === "GameOver"}
                score={score}
                handleClose={handleGameOver}
            />
            <HighScoreToast show={showHighScoreToast} score={score} />
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
