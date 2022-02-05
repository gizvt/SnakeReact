import { Image } from "react-bootstrap";
import reactLogo from "../../assets/logo192.png";

export function Title() {
    return (
        <span className="display-6">
            <Image src={reactLogo} alt="" height={75} className="me-2" />
            SnakeReact
        </span>
    );
}
