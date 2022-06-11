import { useEffect, useRef, useState } from "react";
import {
    addHighScore,
    Board,
    Direction,
    GameMode,
    gameModeConfig,
    getPlayerName,
    isNewHighScore,
    Sound,
} from "../modules";
import inputHandler from "../modules/services/input-handler";

export type GameStatus = "Idle" | "InProgress" | "Paused" | "GameOver";

export function useGameState(gameMode: GameMode) {
    const [gameStatus, setGameStatus] = useState<GameStatus>("Idle");
    const [score, setScore] = useState(0);
    const [pelletCoords, setPelletCoords] = useState<string[]>([]);
    const [snakeCoords, setSnakeCoords] = useState<string[]>([]);
    const [showHighScoreToast, setShowHighScoreToast] = useState(false);

    const config = useRef(gameModeConfig[gameMode]);
    const board = useRef(new Board(config.current.boardSize, gameMode));
    const toastTimeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
            if (gameStatus === "Idle") {
                return;
            }

            if (keyboardEvent.key === " ") {
                // Game is either in progress or paused. Toggle pause.
                const newStatus =
                    gameStatus === "InProgress" ? "Paused" : "InProgress";

                setGameStatus(newStatus);
            } else if (gameStatus === "InProgress") {
                // Only listen to inputs if the game is in progress.
                inputHandler.setNextDirection(
                    Direction.fromKey(keyboardEvent.key),
                    board.current.snake.direction || Direction.None
                );
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [gameStatus]);

    // Uses setInterval to run the gameLoop every x seconds. If the status
    // changes to "Paused", I think the cleanup will remove the setInterval from
    // the previous run, and then retrn early, thus not setting up another set
    // interval and pausing the game.
    useEffect(() => {
        const gameLoop = () => {
            if (gameStatus === "Paused") {
                return;
            }

            board.current.moveSnake(inputHandler.nextDirection);

            if (!board.current.isInIllegalState) {
                // Don't update the board if it's in an illegal state, otherwise
                // it will render weirdly.
                const newBoardState = getNewBoardState();
                setSnakeCoords(newBoardState.snakeCoords);
                setPelletCoords(newBoardState.pelletCoords);
                setScore(board.current.snake.pelletsEaten);
                return;
            }

            document.dispatchEvent(
                new CustomEvent("PlayAudio", { detail: Sound.GameOver })
            );

            setGameStatus("GameOver");
        };

        if (gameStatus === "InProgress") {
            const timerId = setInterval(() => gameLoop(), config.current.speed);
            return () => {
                clearInterval(timerId);
            };
        }
    }, [gameStatus]);

    const startGame = async () => {
        if (gameStatus !== "Idle") {
            return;
        }

        // If the toast is showing, hide it and clear its timeout.
        if (showHighScoreToast) {
            setShowHighScoreToast(false);
            toastTimeout.current && clearTimeout(toastTimeout.current);
        }

        board.current.spawnSnake();
        board.current.spawnPellets();
        const newBoardState = getNewBoardState();
        setSnakeCoords(newBoardState.snakeCoords);
        setPelletCoords(newBoardState.pelletCoords);
        setGameStatus("InProgress");
    };

    const endGame = async () => {
        if (gameStatus !== "GameOver") {
            return;
        }

        const score = board.current.snake.pelletsEaten;
        const playerName = await getPlayerName();
        board.current.reset();

        if (playerName && (await isNewHighScore(score, gameMode))) {
            await addHighScore(playerName, score, gameMode);
            setShowHighScoreToast(true);

            // Hide the toast after 5 seconds.
            toastTimeout.current = setTimeout(
                () => setShowHighScoreToast(false),
                5000
            );
        }

        setSnakeCoords([]);
        setPelletCoords([]);
        setGameStatus("Idle");
    };

    function getNewBoardState() {
        const snakeCoords = board.current.snake.points.map((point) =>
            point.toString()
        );

        const pelletCoords = board.current.pellets.map((pellet) =>
            pellet.point.toString()
        );

        return {
            snakeCoords,
            pelletCoords,
        };
    }

    const boardSize = config.current.boardSize;

    return {
        boardSize,
        snakeCoords,
        pelletCoords,
        score,
        status: gameStatus,
        showHighScoreToast,
        setShowHighScoreToast,
        startGame,
        endGame,
    };
}
