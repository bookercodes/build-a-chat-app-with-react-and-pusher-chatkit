import React, { Component } from "react";

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("NAME2", this.state.username);
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Pick a username</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Your name"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default UsernameForm;
