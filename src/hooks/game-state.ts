import { useEffect, useRef, useState } from "react";
import {
    addHighScore,
    AudioPlayer,
    Board,
    defaultSettings,
    Direction,
    gameModeConfig,
    getPlayerName,
    getSettings,
    isNewHighScore,
    Sound,
} from "../modules";
import inputHandler from "../modules/services/input-handler";

type Status = "Idle" | "InProgress" | "Paused" | "GameOver";

export function useGameState() {
    const boardSize = 15;

    const [status, setStatus] = useState<Status>("Idle");
    const [showHighScoreToast, setShowHighScoreToast] = useState(false);
    const [score, setScore] = useState(0);
    const [pelletCoords, setPelletCoords] = useState<string[]>([]);
    const [snakeCoords, setSnakeCoords] = useState<string[]>([]);

    const board = useRef(new Board(boardSize));
    const audioPlayer = useRef(new AudioPlayer());
    const settings = useRef(defaultSettings);
    const config = useRef(gameModeConfig.none);

    useEffect(() => {
        async function applySettings() {
            const userSettings = await getSettings();
            settings.current = userSettings;
            config.current = gameModeConfig[userSettings.gameMode];
            audioPlayer.current.isEnabled = userSettings.audioEnabled;
            audioPlayer.current.init();
            board.current.gameMode = userSettings.gameMode;
        }

        applySettings();
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
                    board.current.snake?.direction || Direction.None
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
            console.log("loop");
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
                setScore(board.current.snake!.pelletsEaten);
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
        board.current.spawnPellets(config.current.numberOfPellets);
        const newBoardState = getNewBoardState();
        setSnakeCoords(newBoardState.snakeCoords);
        setPelletCoords(newBoardState.pelletCoords);
        setStatus("InProgress");
    };

    const endGame = async () => {
        if (status !== "GameOver") {
            return;
        }

        const score = board.current.snake!.pelletsEaten;
        const playerName = await getPlayerName();
        const wrap = settings.current.wrapEnabled;
        board.current.reset();

        if (playerName && (await isNewHighScore(score, wrap))) {
            await addHighScore(playerName, score, wrap);
            setShowHighScoreToast(true);
        }

        setSnakeCoords([]);
        setPelletCoords([]);
        setStatus("Idle");
    };

    function getNewBoardState() {
        const snakeCoords = board.current.snake!.points.map((point) =>
            point.toString()
        );

        const pelletCoords = board.current.pellets!.map((pellet) =>
            pellet.point.toString()
        );

        return {
            snakeCoords,
            pelletCoords,
        };
    }

    return {
        snakeCoords,
        pelletCoords,
        boardSize,
        score,
        status,
        showHighScoreToast,
        startGame,
        endGame,
    };
}
