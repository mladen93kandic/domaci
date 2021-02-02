import React from "react";
import "../../src/App.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    inputPassword: "",
    error: null,
    usernameMessage: "true",
    passwordMessage: "true",
  };

  onInputChange = (event) => {
    const message = event.target.name + "Message";
    this.setState({
      [event.target.name]: event.target.value,
      [message]: "false",
    });
  };

  hasLowerCase = (str) => {
    return /[a-z]/.test(str);
  };
  hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.password);

    let psw = document.getElementById("pass").value;
    let brVelikihSlova = 0;
    for (let i = 0; i < psw.length; i++) {
      if (psw[i] === psw[i].toUpperCase()) {
        if (psw[i] >= 0 || psw[i] <= 9) {
        } else {
          brVelikihSlova++;
        }
      }
    }
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      typeof this.state.username === "undefined" ||
      typeof this.state.password === "undefined"
    ) {
      this.setState({
        error: "You must fill all fields",
      });
    } else if (
      this.state.username.length < 3 ||
      this.state.username.length > 20
    ) {
      this.setState({
        error: "Username must have at least 3, and no more than 20 characters.",
      });
    } else if (this.hasLowerCase(psw) === false) {
      this.setState({
        error: "Password must have at least one small letter. ",
      });
    } else if (this.hasNumber(psw) === false) {
      this.setState({
        error: "Password must have at least one digit.",
      });
    } else if (brVelikihSlova === 0) {
      this.setState({
        error: "Password must have at least one capital letter.",
      });
    } else if (psw.length < 5 || psw.length > 25) {
      this.setState({
        error: "Password must have at least 5, and max 25 characters.",
      });
    } else {
      axios
        .post("http://localhost:3001/login", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.error);
          if (response.data.error) {
            this.setState({
              error: response.data.error,
            });
          } else {
            localStorage.setItem("userid", response.data);
            this.props.history.push("/product");
          }
        })
        .catch((err) =>
          this.setState({
            username: "",
            password: "",
            email: "",
            error: "Error occured.Please try again. ",
          })
        );
    }
  };
  renderError = () => {
    if (this.state.error) {
      return <h1> {this.state.error} </h1>;
    }
  };
  render() {
    return (
      <div className="container">
        <div className="wrap wrap-login">
          <form
            autoComplete="off"
            className="form"
            onSubmit={this.onFormSubmit}
          >
            <span className="logo">
              <img
                src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                alt="slika"
              />
            </span>{" "}
            <span className="header"> Log in </span>{" "}
            <div className="centralize" style={{ margin: "1%" }}>
              <div className="ui left icon input login-width">
                <input
                  type="text"
                  placeholder="Username"
                  id="user"
                  name="username"
                  onChange={this.onInputChange}
                  value={this.state.username}
                />{" "}
                <i className="users icon"> </i>{" "}
              </div>{" "}
              <span className={this.state.usernameMessage}>
                Username is required, minimal length is 3 characters, maximal
                length is 20 characters
              </span>
            </div>{" "}
            <div className="centralize" style={{ margin: "1%" }}>
              <div className="ui left icon input login-width">
                <input
                  type="password"
                  id="pass"
                  name="password"
                  placeholder="Password"
                  onChange={this.onInputChange}
                  value={this.state.password}
                />{" "}
                <i className="key icon"> </i>{" "}
              </div>{" "}
              <span className={this.state.passwordMessage}>
                Password is required, minimal length is 5 characters, maximal
                length is 25 characters, and it must have at least one digit,
                small and capital letter
              </span>
            </div>{" "}
            <div className="container-btn">
              <button className="ui button"> Login </button>{" "}
            </div>{" "}
            <div>
              <span className="headerbottom"> You don 't have account?</span>{" "}
            </div>{" "}
            <div className="container-btn">
              <Link to="/signup" className="ui button">
                Signup{" "}
              </Link>{" "}
            </div>{" "}
          </form>{" "}
          <div className="red">{this.renderError()} </div>
        </div>{" "}
      </div>
    );
  }
}

export default Login;
