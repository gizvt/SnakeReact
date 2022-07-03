import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./site.css";
import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./App";

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Container fluid>
                <App />
            </Container>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
