import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./site.css";
import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HashRouter>
            <Container fluid>
                <App />
            </Container>
        </HashRouter>
    </React.StrictMode>
);
