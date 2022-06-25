import { useEffect, useState } from "react";

interface Props {
    status: "Active" | "Stopped" | "Paused";
}

export function Timer(props: Props) {
    const [time, setTime] = useState(0);
    const tick = () => setTime((time) => time + 1);
    const reset = () => setTime(0);

    useEffect(() => {
        const intervalId = setInterval(() => tick(), 1000);

        if (props.status !== "Active") {
            if (props.status === "Stopped") {
                reset();
            }

            clearInterval(intervalId);
        }

        return function cleanup() {
            clearInterval(intervalId);
        };
    }, [props.status]);

    return (
        <span className="lead">
            <i className="bi bi-stopwatch me-2 text-react"></i>
            {formatTime(time)}
        </span>
    );
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60).toString();
    const seconds = (time % 60).toString();
    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
