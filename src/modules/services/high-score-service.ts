const key = "highScores";
const maxHighScores = 10;

interface HighScore {
    playerName: string;
    score: number;
    date: string;
}

export async function getHighScores() {
    const highScores = localStorage.getItem(key);

    if (highScores) {
        return JSON.parse(highScores) as HighScore[];
    }

    return [];
}

export async function addHighScore(playerName: string, score: number) {
    if (!(await isNewHighScore(score))) {
        throw new Error("Score is not a new high score.");
    }

    const highScore: HighScore = {
        date: new Date(Date.now()).toISOString(),
        playerName: playerName,
        score: score,
    };

    localStorage.setItem(key, JSON.stringify(highScore));
}

export async function isNewHighScore(score: number) {
    const highScores = await getHighScores();

    if (highScores.length < maxHighScores) {
        return true;
    }

    const weakestHighScore = findWeakestHighScore(highScores);
    return weakestHighScore.score < score;
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
