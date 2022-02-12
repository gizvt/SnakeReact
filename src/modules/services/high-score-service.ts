const wrapKey = "highScores_wrap";
const noWrapKey = "highScores_noWrap";
const maxHighScores = 10;

export interface HighScore {
    id: string;
    playerName: string;
    score: number;
    wrap: boolean;
    date: string;
}

export async function getHighScores(wrap: boolean) {
    const highScores = localStorage.getItem(getKey(wrap));

    if (highScores) {
        return JSON.parse(highScores) as HighScore[];
    }

    return [];
}

export async function addHighScore(
    playerName: string,
    score: number,
    wrap: boolean
) {
    if (!(await isNewHighScore(score, wrap))) {
        throw new Error("Score is not a new high score.");
    }

    let highScores = await getHighScores(wrap);

    if (highScores.length >= maxHighScores) {
        deleteWeakestHighScore(highScores);
    }

    const highScore: HighScore = {
        id: Date.now().toString(),
        date: new Date(Date.now()).toISOString(),
        playerName: playerName,
        score: score,
        wrap: wrap,
    };

    highScores.push(highScore);
    localStorage.setItem(getKey(wrap), JSON.stringify(highScores));
}

export async function isNewHighScore(score: number, wrap: boolean) {
    const highScores = await getHighScores(wrap);

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

const getKey = (wrap: boolean) => (wrap ? wrapKey : noWrapKey);
