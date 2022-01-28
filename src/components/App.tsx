import { Component } from "react";
import { Board } from "./Board/Board";
import Image from "react-bootstrap/Image";

function Title() {
    return (
        <h1 className="text-center">
            <Image src="logo192.png" alt="" height={75} />
            SnakeReact
        </h1>
    );
}

export class App extends Component {
    render() {
        return (
            <>
                <Title />
                <Board size={15} />
            </>
        );
    }
}

export default App;
