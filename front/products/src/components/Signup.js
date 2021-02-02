import React from "react";
import "../../src/App.css";
import axios from "axios";
var passwordHash = require("password-hash");

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    inputPassword: "",
    email: "",
    role: 0,
    error: "",
    usernameMessage: "true",
    passwordMessage: "true",
    emailMessage: "true",
  };
  hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  onInputChange = (event) => {
    const message = event.target.name + "Message";
    if (event.target.type === "password") {
      let pass = document.getElementById("pass").value;
      let hashedPassword = passwordHash.generate(pass);
      this.setState({
        password: hashedPassword,
        inputPassword: pass,
        passwordMessage: "false",
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        [message]: "false",
      });
    }
  };
  validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  hasLowerCase = (str) => {
    return /[a-z]/.test(str);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    let checkMail = this.validateEmail(this.state.email);
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
      this.state.email === "" ||
      this.state.role === "" ||
      typeof this.state.username === "undefined" ||
      typeof this.state.password === "undefined" ||
      typeof this.state.email === "undefined" ||
      typeof this.state.role === "undefined"
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
    } else if (checkMail === false) {
      this.setState({
        error: "You have to input valid email",
      });
    } else if (this.state.email.length < 5 || this.state.username.length > 35) {
      this.setState({
        error: "Email must have at least 5, and max 35 characters. ",
      });
    } else {
      axios
        .post("http://localhost:3001/signup", {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          role: this.state.role,
        })
        .then((response) => {
          console.log(response.data);
          if (!response.data.error) {
            console.log(response.data);
            this.props.history.push("/login");
          } else if (response.data.error) {
            if (response.data.error.errors) {
              let nodeError = response.data.error.errors;
              console.log(nodeError);
              let errArray = [];
              var x;
              for (x in nodeError) {
                if (x === "username") {
                  errArray.push(nodeError.username.message);
                }
                if (x === "password") {
                  errArray.push(nodeError.password.message);
                }
                if (x === "email") {
                  errArray.push(nodeError.email.message);
                }
              }

              let nodeErrorMessage = errArray.map((el) => <p key={el}>{el}</p>);

              this.setState({
                error: nodeErrorMessage,
              });
            } else {
              this.setState({
                error: response.data.error,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: "Došlo je do greške. Molimo Vas da pokušate ponovo.",
          });
        });
    }
  };

  renderError() {
    if (this.state.error) {
      return <h1 className="red"> {this.state.error} </h1>;
    }
  }
  render() {
    return (
      <div className="container">
        <div className="wrap wrap-login">
          <form
            className="form"
            onSubmit={this.onFormSubmit}
            autoComplete="off"
          >
            <span className="logo">
              <img
                src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                alt="slika"
              />
            </span>{" "}
            <span className="header"> Sign up </span>{" "}
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
                  value={this.state.inputPassword}
                />{" "}
                <i className="key icon"> </i>{" "}
              </div>{" "}
              <span className={this.state.passwordMessage}>
                Password is required, minimal length is 5 characters, maximal
                length is 25 characters, and it must have at least one digit,
                small and capital letter
              </span>
            </div>{" "}
            <div className="centralize" style={{ margin: "1%" }}>
              <div className="ui left icon input login-width">
                <input
                  className="input-login"
                  id="mail"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={this.onInputChange}
                  value={this.state.email}
                />{" "}
                <i className="mail icon"> </i>{" "}
              </div>{" "}
              <span className={this.state.emailMessage}>
                Email is required, minimal length is 5 characters, maximal
                length is 35 characters
              </span>
            </div>{" "}
            <div className="centralize" style={{ margin: "1%" }}>
              <div className="ui left icon input login-width">
                <select onChange={this.onInputChange} name="role">
                  <option value="0"> Basic user </option>{" "}
                  <option value="1"> Admin </option>{" "}
                </select>{" "}
              </div>{" "}
            </div>{" "}
            <div className="container-btn">
              <button className="ui button"> Signup </button>{" "}
            </div>{" "}
          </form>{" "}
          {this.renderError()}{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Signup;
