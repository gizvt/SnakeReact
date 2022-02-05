import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./site.css";
import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(
    <React.StrictMode>
        <Container>
            <App />
        </Container>
    </React.StrictMode>,
    document.getElementById("root")
);
