import { ReactElement, useEffect, useState } from "react";
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

type Status = "Idle" | "InProgress" | "Paused";

const boardSize = 15;
const board = new Board(boardSize);
const audioPlayer = new AudioPlayer();
const emptyCells = createCells(boardSize);
let settings = defaultSettings;
let chosenGameSettings = gameSettings["classic"];

export function GameFunc() {
    const [status, setStatus] = useState<Status>("Idle");
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [showHighScoreToast, setShowHighScoreToast] = useState(false);
    const [score, setScore] = useState(0);
    const [cells, setCells] = useState(emptyCells);

    useEffect(() => {
        const gameLoop = () => {
            if (status === "Paused") {
                return;
            }

            board.moveSnake(inputHandler.nextDirection);

            if (!board.isInIllegalState) {
                // Don't update the board if it's in an illegal state, otherwise
                // it will render weirdly.
                setCells(getNewBoardState());
                setScore(board.snake!.pelletsEaten);
                return;
            }

            document.dispatchEvent(
                new CustomEvent("PlayAudio", { detail: Sound.GameOver })
            );

            setStatus("Idle");
            setShowGameOverModal(true);
        };

        if (status === "InProgress") {
            const timerId = setTimeout(() => gameLoop(), 85);
            return () => {
                clearTimeout(timerId);
            };
        }
    });

    useEffect(() => {
        async function applySettings() {
            const userSettings = await getSettings();
            settings = userSettings;
            chosenGameSettings = gameSettings[settings.gameMode];
            audioPlayer.isEnabled = settings.audioEnabled;
            audioPlayer.init();
            board.numberOfPellets = chosenGameSettings.numberOfPellets;
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
                    board.snake?.direction || Direction.None
                );
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [status]);

    const handleStartGame = async () => {
        board.spawnSnake(settings.gameMode);
        board.spawnPellets(chosenGameSettings.numberOfPellets);
        const cells = getNewBoardState();
        setCells(cells);
        setStatus("InProgress");
    };

    const handleGameOver = async () => {
        const score = board.snake!.pelletsEaten;
        const playerName = await getPlayerName();
        const wrap = settings.wrapEnabled;
        board.reset();

        if (playerName && (await isNewHighScore(score, wrap))) {
            await addHighScore(playerName, score, wrap);
            setShowHighScoreToast(true);
        }

        setCells({ ...emptyCells });
        setShowGameOverModal(false);
        setScore(score);
    };

    function handleHighScoreToastClose() {
        setShowHighScoreToast(false);
    }

    return (
        <>
            <GameOverModal
                show={showGameOverModal}
                score={score}
                handleClose={handleGameOver}
            />
            <HighScoreToast
                show={showHighScoreToast}
                score={score}
                handleClose={handleHighScoreToastClose}
            />
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

function getNewBoardState() {
    let cells = { ...emptyCells };
    //const pellet = this.board.pellets!.point.toString();

    board.snake!.points.forEach(
        (p) => (cells[p.toString()] = createCell(p.toString(), "Snake"))
    );

    board.pellets!.forEach(
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
