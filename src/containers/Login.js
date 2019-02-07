import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      olmId: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.olmId.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const rawResponse = await fetch("http://localhost:443/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: this.state.password,
          olmId: this.state.olmId
        })
      });
      const user = await rawResponse.json();
      if (user.status.code === 500) {
        alert(user.status.message);
      } else {
        localStorage.setItem("isLogin", true);
        this.props.userHasAuthenticated(true);
        this.props.history.push("/");
      }
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="olmId" bsSize="large">
            <ControlLabel>olmId</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.olmId}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
