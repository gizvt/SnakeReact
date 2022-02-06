import { Image } from "react-bootstrap";
import reactLogo from "../assets/logo192.png";

interface Props {
    spinLogo: boolean;
}

export function Title(props: Props) {
    const className = props.spinLogo
        ? `me-2 logo-spin`
        : "me-2 logo-spin-limited";

    return (
        <span className="display-6">
            <Image src={reactLogo} alt="" height={80} className={className} />
            SnakeReact
        </span>
    );
}
