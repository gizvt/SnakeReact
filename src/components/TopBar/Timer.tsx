import { useEffect, useState } from "react";

interface Props {
    shouldRun: boolean;
}

export function Timer(props: Props) {
    const [time, setTime] = useState(0);
    const tick = () => setTime((time) => time + 1);
    const reset = () => setTime(0);

    useEffect(() => {
        if (props.shouldRun) {
            const intervalId = setInterval(() => tick(), 1000);

            return function cleanup() {
                clearInterval(intervalId);
                reset();
            };
        }
    }, [props.shouldRun]);

    return (
        <span className="lead">
            <i className="bi bi-stopwatch text-primary me-2"></i>
            {formatTime(time)}
        </span>
    );
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60).toString();
    const seconds = (time % 60).toString();
    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
