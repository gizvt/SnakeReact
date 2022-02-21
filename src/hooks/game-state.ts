import { useEffect, useRef, useState } from "react";
import {
    addHighScore,
    AudioPlayer,
    Board,
    Direction,
    GameMode,
    gameModeConfig,
    getPlayerName,
    getSettings,
    isNewHighScore,
    Sound,
} from "../modules";
import inputHandler from "../modules/services/input-handler";

type Status = "Idle" | "InProgress" | "Paused" | "GameOver";

export function useGameState(gameMode: GameMode) {
    const [status, setStatus] = useState<Status>("Idle");
    const [score, setScore] = useState(0);
    const [pelletCoords, setPelletCoords] = useState<string[]>([]);
    const [snakeCoords, setSnakeCoords] = useState<string[]>([]);
    const [showHighScoreToast, setShowHighScoreToast] = useState(false);

    const config = useRef(gameModeConfig[gameMode]);
    const board = useRef(new Board(config.current.boardSize, gameMode));
    const audioPlayer = useRef(new AudioPlayer());

    useEffect(() => {
        async function applyUserSettings() {
            const userSettings = await getSettings();
            audioPlayer.current.volume = userSettings.volume;
            audioPlayer.current.init();
        }

        applyUserSettings();
    }, []);

    useEffect(() => {
        const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
            if (status === "Idle") {
                return;
            }

            if (keyboardEvent.key === " ") {
                // Game is either in progress or paused. Toggle pause.
                const newStatus =
                    status === "InProgress" ? "Paused" : "InProgress";

                setStatus(newStatus);
            } else if (status === "InProgress") {
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
    }, [status]);

    // Uses setInterval to run the gameLoop every x seconds. If the status
    // changes to "Paused", I think the cleanup will remove the setInterval from
    // the previous run, and then retrn early, thus not setting up another set
    // interval and pausing the game.
    useEffect(() => {
        const gameLoop = () => {
            if (status === "Paused") {
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

            setStatus("GameOver");
        };

        if (status === "InProgress") {
            const timerId = setInterval(() => gameLoop(), config.current.speed);
            return () => {
                clearInterval(timerId);
            };
        }
    }, [status]);

    const startGame = async () => {
        if (status !== "Idle") {
            return;
        }

        board.current.spawnSnake();
        board.current.spawnPellets();
        const newBoardState = getNewBoardState();
        setSnakeCoords(newBoardState.snakeCoords);
        setPelletCoords(newBoardState.pelletCoords);
        setStatus("InProgress");
    };

    const endGame = async () => {
        if (status !== "GameOver") {
            return;
        }

        const score = board.current.snake.pelletsEaten;
        const playerName = await getPlayerName();
        board.current.reset();

        if (playerName && (await isNewHighScore(score, gameMode))) {
            await addHighScore(playerName, score, gameMode);
            setShowHighScoreToast(true);
        }

        setSnakeCoords([]);
        setPelletCoords([]);
        setStatus("Idle");
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
        status,
        showHighScoreToast,
        startGame,
        endGame,
    };
}
