import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { AudioPlayer } from "./modules";
import { Game } from "./pages/Game/Game";
import { HighScores } from "./pages/HighScores/HighScores";
import { MainMenu } from "./pages/MainMenu/MainMenu";

export const App = React.memo(function () {
    // console.log("Rendering App");
    const audioPlayer = useRef(new AudioPlayer());

    useEffect(() => {
        audioPlayer.current.init();
    }, []);

    return (
        // Apply strict mode here instead of in index.txs to stop the audio
        // from playing twice due to strict mode's double rendering of the App
        // component (where the audio player exists inside a useRef).
        <Routes>
            <Route path="/" element={<MainMenu />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/high-scores" element={<HighScores />}></Route>
        </Routes>
    );
});
