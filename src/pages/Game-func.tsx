import { ReactElement, useEffect, useRef, useState } from "react";
import {
    Board as BoardComponent,
    BottomBar,
    Cell,
    CellType,
    GameOverModal,
    TopBar,
    HighScoreToast,
} from "../components";
import {
    AudioPlayer,
    Board,
    Direction,
    Point,
    Sound,
    getSettings,
    defaultSettings,
    isNewHighScore,
    addHighScore,
    getPlayerName,
    gameSettings,
} from "../modules";
import inputHandler from "../modules/services/input-handler";

interface Cells {
    [key: string]: ReactElement;
}

type Status = "Idle" | "InProgress" | "Paused" | "GameOver";

// const boardSize = 15;
// const board = new Board(boardSize);
// const audioPlayer = new AudioPlayer();
// const emptyCells = createCells(boardSize);
// let settings = defaultSettings;
// let chosenGameSettings = gameSettings["classic"];

function useGameState() {
    const boardSize = 15;
    const emptyCells = createCells(boardSize);
    let settings = defaultSettings;
    let chosenGameSettings = gameSettings["classic"];

    const [status, setStatus] = useState<Status>("Idle");
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [showHighScoreToast, setShowHighScoreToast] = useState(false);
    const [score, setScore] = useState(0);
    const [cells, setCells] = useState(emptyCells);

    const board = useRef(new Board(boardSize));
    const audioPlayer = useRef(new AudioPlayer());

    useEffect(() => {
        async function applySettings() {
            const userSettings = await getSettings();
            settings = userSettings;
            chosenGameSettings = gameSettings[settings.gameMode];
            audioPlayer.current.isEnabled = settings.audioEnabled;
            audioPlayer.current.init();
            board.current.numberOfPellets = chosenGameSettings.numberOfPellets;
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

    useEffect(() => {
        const gameLoop = () => {
            if (status === "Paused") {
                return;
            }

            board.current.moveSnake(inputHandler.nextDirection);

            if (!board.current.isInIllegalState) {
                // Don't update the board if it's in an illegal state, otherwise
                // it will render weirdly.
                setCells(getNewBoardState());
                setScore(board.current.snake!.pelletsEaten);
                return;
            }

            document.dispatchEvent(
                new CustomEvent("PlayAudio", { detail: Sound.GameOver })
            );

            setStatus("GameOver");
        };

        if (status === "InProgress") {
            const timerId = setTimeout(() => gameLoop(), 85);
            return () => {
                clearTimeout(timerId);
            };
        }
    });

    const startGame = async () => {
        if (status !== "Idle") {
            return;
        }

        board.current.spawnSnake(settings.gameMode);
        board.current.spawnPellets(chosenGameSettings.numberOfPellets);
        const cells = getNewBoardState();
        setCells(cells);
        setStatus("InProgress");
    };

    const endGame = async () => {
        if (status !== "GameOver") {
            return;
        }

        const score = board.current.snake!.pelletsEaten;
        const playerName = await getPlayerName();
        const wrap = settings.wrapEnabled;
        board.current.reset();

        if (playerName && (await isNewHighScore(score, wrap))) {
            await addHighScore(playerName, score, wrap);
            setShowHighScoreToast(true);
        }

        setCells({ ...emptyCells });
        setStatus("Idle");
    };

    function getNewBoardState() {
        let cells = { ...emptyCells };
        //const pellet = this.board.pellets!.point.toString();

        board.current.snake!.points.forEach(
            (p) => (cells[p.toString()] = createCell(p.toString(), "Snake"))
        );

        board.current.pellets!.forEach(
            (p) =>
                (cells[p.point.toString()] = createCell(
                    p.point.toString(),
                    "Pellet"
                ))
        );

        // cells[pellet] = this.createCell(pellet, "Pellet");
        return cells;
    }

    function createCells(boardSize: number) {
        const cells: Cells = {};

        for (let i = 0; i < Math.pow(boardSize, 2); i++) {
            const y = Math.floor(i / boardSize);
            const x = i - y * boardSize;
            const point = new Point(x, y).toString();
            cells[point] = createCell(point, "Empty");
        }

        return cells;
    }

    function createCell(coords: string, type: CellType) {
        return <Cell key={coords} type={type} />;
    }

    return {
        boardSize,
        cells,
        score,
        status,
        showHighScoreToast,
        startGame,
        endGame,
    };
}

export function GameFunc() {
    const {
        boardSize,
        cells,
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
            <BoardComponent size={boardSize}>
                {Object.values(cells)}
            </BoardComponent>
            <BottomBar
                handleStartGame={handleStartGame}
                disableStartButton={status !== "Idle"}
            ></BottomBar>
        </>
    );
}
