import { useEffect, useState } from "react";

export function Timer() {
    const [time, setTime] = useState(0);
    const tick = () => setTime((time) => time + 1);
    const reset = () => setTime(0);

    useEffect(() => {
        const intervalId = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(intervalId);
            reset();
        };
    }, []);

    return <p>{formatTime(time)}</p>;
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60).toString();
    const seconds = (time % 60).toString();
    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
