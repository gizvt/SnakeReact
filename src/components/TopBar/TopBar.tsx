import { PlayerName, Timer, Score } from "..";

interface Props {
    score?: number;
    showTimer: boolean;
}

export function TopBar(props: Props) {
    return (
        <div>
            <PlayerName />
            {/* {props.showTimer && <Timer />} */}
            <Score score={props.score || 0} />
        </div>
    );
}
