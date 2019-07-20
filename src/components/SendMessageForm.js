import React, { Component } from "react";

export default class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    // instead of writing:
    // this.onSubmit = this.onSubmit.bind(this), we can use
    // PROPERTY INITIALIZER SYNTAX to bind a function to THIS
    // component's scope
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.text);
        // again, the line below is just for good UX; clear the 
        // text area after a user hits enter
        this.setState({ text: "" })
    }

    onChange = (e) => {
        this.setState({ text: e.target.value });
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    render() {
        const styles = {
            container: {
                padding: 20,
                borderTop: '1px #4C758F solid',
                marginBottom: 20,
            },
            form: {
                display: 'flex',
            },
            input: {
                color: 'inherit',
                background: 'none',
                outline: 'none',
                border: 'none',
                flex: 1,
                fontSize: 16,
            },
        }
        return (
            <div style={styles.container}>
                <div>
                    <form onSubmit={this.onSubmit} style={styles.form}>
                        <input 
                            type="text"
                            placehodler ="Type a message here then hit ENTER"
                            onChange={this.onChange}
                            value={this.state.text}
                            style={styles.input}
                        />
                    </form>
                </div>
            </div>
        )
    }
}