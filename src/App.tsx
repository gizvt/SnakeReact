import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import { GameFunc } from "./pages/Game-func";
import { HighScores } from "./pages/HighScores";
import { MainMenu } from "./pages/MainMenu";

export const App = React.memo(function () {
    // console.log("Rendering App");

    return (
        <Routes>
            <Route path="/" element={<MainMenu />}></Route>
            <Route path="/game" element={<GameFunc />}></Route>
            <Route path="/high-scores" element={<HighScores />}></Route>
        </Routes>
    );
});
