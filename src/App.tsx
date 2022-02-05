import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import { MainMenu } from "./pages/MainMenu";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<MainMenu />}></Route>
            <Route path="/game" element={<Game />}></Route>
        </Routes>
    );
}
