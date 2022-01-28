import { Component } from "react";
// import "./Button.css";

interface Props {
    text: string;
    onClick(): void;
}

export class Button extends Component<Props> {
    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <button onClick={() => this.handleClick()}>
                {this.props.text}
            </button>
        );
    }
}
