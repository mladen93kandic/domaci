import React from "react";
import "../../src/App.css";
import { Link } from "react-router-dom";
import axios from "axios";
var passwordHash = require("password-hash");

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: null,
  };

  onInputChange = (event) => {
    if (event.target.type === "password") {
      let pass = document.getElementById("pass").value;
      let hashedPassword = passwordHash.generate(pass);
      this.setState({
        password: hashedPassword,
      });
      console.log(pass);
      console.log(this.state.password);
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          this.setState({
            error:
              "Unijeli ste pogrešan pasvord ili korisnicko ime. Molimo Vas probajte ponovo ili se registrujte ukoliko nemate profil.",
          });
        } else {
        }
      })
      .catch((err) =>
        this.setState({
          username: "",
          password: "",
          email: "",
          error: "Došlo je do greške. Molimo Vas da pokušate ponovo.",
        })
      );
  };
  renderError() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
  }
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
            </span>
            <span className="header"> Log in </span>
            <div className="centralize" style={{ margin: "1%" }}>
              <div className="ui left icon input login-width">
                <input
                  type="text"
                  placeholder="Username"
                  id="user"
                  name="username"
                  placeholder="Username"
                  onChange={this.onInputChange}
                  value={this.state.username}
                />
                <i className="users icon"></i>
              </div>
            </div>
            <div className="centralize" style={{ margin: "1%" }}>
              <div className="ui left icon input login-width">
                <input
                  type="password"
                  id="pass"
                  name="password"
                  placeholder="Password"
                  onChange={this.onInputChange}
                  value={this.state.password}
                />
                <i className="key icon"></i>
              </div>
            </div>
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
          {this.renderError()}
        </div>{" "}
      </div>
    );
  }
}

export default Login;
