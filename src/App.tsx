import React, { Profiler } from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import { MainMenu } from "./pages/MainMenu";

export const App = React.memo(function () {
    console.log("Rendering App");

    return (
        <Routes>
            <Route path="/" element={<MainMenu />}></Route>
            <Route path="/game" element={<Game />}></Route>
        </Routes>
    );
});
