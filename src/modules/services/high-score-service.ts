import { GameMode, allGameModes } from "../domain/game-modes";

const maxHighScores = 10;
const composeKey = (gameMode: GameMode) => `highScores_${gameMode}`;

export interface HighScore {
    id: string;
    playerName: string;
    score: number;
    gameMode: GameMode;
    date: string;
}

export interface GameModeHighScores {
    gameMode: GameMode;
    highScores: HighScore[];
}

export async function getAllHighScores(): Promise<GameModeHighScores[]> {
    const allHighScores = allGameModes.map(async (gameMode) => {
        const highScores = await getHighScores(gameMode);

        const gameModeHighScores: GameModeHighScores = {
            gameMode: gameMode,
            highScores: highScores,
        };

        return gameModeHighScores;
    });

    return Promise.all(allHighScores);
}

export async function getHighScores(gameMode: GameMode) {
    const highScores = localStorage.getItem(composeKey(gameMode));

    if (highScores) {
        return JSON.parse(highScores) as HighScore[];
    }

    return [];
}

export async function addHighScore(
    playerName: string,
    score: number,
    gameMode: GameMode
) {
    if (!(await isNewHighScore(score, gameMode))) {
        throw new Error("Score is not a new high score.");
    }

    let highScores = await getHighScores(gameMode);

    if (highScores.length >= maxHighScores) {
        deleteWeakestHighScore(highScores);
    }

    const highScore: HighScore = {
        id: Date.now().toString(),
        date: new Date(Date.now()).toISOString(),
        playerName: playerName,
        score: score,
        gameMode: gameMode,
    };

    highScores.push(highScore);
    localStorage.setItem(composeKey(gameMode), JSON.stringify(highScores));
}

export async function isNewHighScore(score: number, gameMode: GameMode) {
    const highScores = await getHighScores(gameMode);

    if (highScores.length < maxHighScores) {
        return true;
    }

    const weakestHighScore = findWeakestHighScore(highScores);
    return weakestHighScore.score < score;
}

function deleteWeakestHighScore(highScores: HighScore[]) {
    const weakestHighScore = findWeakestHighScore(highScores);

    highScores.splice(
        highScores.findIndex((hs) => hs.id === weakestHighScore.id),
        1
    );
}

function findWeakestHighScore(highScores: HighScore[]) {
    return highScores.reduce(weakestHighScoreReducer);
}

function weakestHighScoreReducer(prev: HighScore, current: HighScore) {
    if (
        prev.score > current.score ||
        (prev.score === current.score && prev.date < current.date)
    ) {
        return current;
    }

    return prev;
}
