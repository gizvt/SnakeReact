import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AudioPlayer } from "./modules";
import { Game } from "./pages/Game/Game";
import { HighScores } from "./pages/HighScores/HighScores";
import { MainMenu } from "./pages/MainMenu/MainMenu";

export const App = React.memo(function () {
    useEffect(() => {
        const audioPlayer = new AudioPlayer();
        audioPlayer.attachListeners();

        return () => audioPlayer.detachListeners();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<MainMenu />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/high-scores" element={<HighScores />}></Route>
        </Routes>
    );
});
