import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { AudioPlayer } from "./modules";
import { Game } from "./pages/Game/Game";
import { HighScores } from "./pages/HighScores/HighScores";
import { MainMenu } from "./pages/MainMenu/MainMenu";

export const App = React.memo(function () {
    // console.log("Rendering App");
    const audioPlayer = useRef(new AudioPlayer());
    audioPlayer.current.init();

    return (
        <Routes>
            <Route path="/" element={<MainMenu />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/high-scores" element={<HighScores />}></Route>
        </Routes>
    );
});
