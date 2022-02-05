import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./site.css";
import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Container>
                <App />
            </Container>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
