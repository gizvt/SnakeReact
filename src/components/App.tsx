import { Component } from "react";
import { Board } from "./Board/Board";

export class App extends Component {
    render() {
        return <Board size={15} />;
    }
}

export default App;
