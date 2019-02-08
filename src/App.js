import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      olmId: ""
    };
  }
  async componentDidMount() {
    try {
      let chekLoggedIn = localStorage.getItem("isLogin");

      if (chekLoggedIn) {
        const getOlmId = localStorage.getItem("olmId");
        this.setState({ olmId: getOlmId });
        this.userHasAuthenticated(true);
      } else {
        this.userHasAuthenticated(false);
      }
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };
  handleLogout = async event => {
    localStorage.setItem("isLogin", "");

    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  };
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      olmId: this.state.olmId
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">
                  {this.state.olmId
                    ? `Welcome ${this.state.olmId}`
                    : `Welcome Guest`}
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated ? (
                  <Fragment>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    <LinkContainer to="/device">
                      <NavItem>Device</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/update">
                      <NavItem>Update</NavItem>
                    </LinkContainer>
                  </Fragment>
                ) : (
                  <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
