import { Image } from "react-bootstrap";
import reactLogo from "../assets/logo192.png";

export function Title() {
    return (
        <h1 className="text-center">
            <Image src={reactLogo} alt="" height={75} />
            SnakeReact
        </h1>
    );
}
