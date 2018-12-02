import React, { Component } from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core"
import classes from "react-mui-login-register";
import LoginRegister from 'react-mui-login-register';


export default class SignUpPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pass: ""
    }
  }
  render() {

    const header = (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">AUTHENTICATION</Typography>
        </Toolbar>
      </AppBar>
    );

    const footer = (
      <div className={classes.footer}>
        <Typography variant="caption" align="center">v0.9</Typography>
      </div>
    );

    return (
      <div>
        <LoginRegister header={header} footer={footer}
          onLogin={this.handleLogin}
          onLoginWithProvider={this.handleLoginWithProvider}
          onRegister={this.handleRegister}
          onRegisterWithProvider={this.handleRegisterWithProvider}
        />
      </div>);
  }

  handleLogin = content => {
    // alert(`Logging in with content '${JSON.stringify(content)}'`);
    // alert(content);
    // this.setState({ id: content.username, pass: content.password })
    this.props.getData(content.username, content.password);
  };

  checkState() {
  }
  handleLoginWithProvider = providerId => {
    alert(`Logging in with provider '${providerId}'`);
    console.log(this.state)

  };

  handleRegister = content => {
    alert(`Registering with content '${JSON.stringify(content)}'`);
  };

  handleRegisterWithProvider = providerId => {
    alert(`Registering with provider '${providerId}'`);
  };
}
