import React from "react";
import "../../src/App.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Product extends React.Component {
  state = {
    userid: localStorage.getItem("userid"),
    name: "",
    description: "",
    price: "",
    quantity: 1,
    image: "",
    error: false,
  };
  onFileChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.price === "" ||
      typeof this.state.name === "undefined" ||
      typeof this.state.price === "undefined"
    ) {
      this.setState({
        error: "Morate unijeti ime i cijenu proizvoda",
      });
    } else if (this.state.name.length < 3 || this.state.name.length > 15) {
      this.setState({
        error: "Ime proizvoda mora sadržati najmanje 3, a najviše 15 karaktera",
      });
    } else if (
      (this.state.description !== "" && this.state.name.description < 10) ||
      this.state.name.description > 150
    ) {
      this.setState({
        error:
          "Opis proizvoda mora sadržati najmanje 10, a najviše 150 karaktera",
      });
    } else if (this.state.price < 1 || this.state.price > 10000) {
      this.setState({
        error:
          "Cijena proizvoda ne smije biti manja od 1 ni veca od 10.000 eura",
      });
    } else if (this.state.quantity < 1 || this.state.quantity > 10) {
      this.setState({
        error: "Kolicina proizvoda ne smije biti manja od 1 ni veca od 10",
      });
    } else if (this.state.image !== "" && this.state.image.size > 300000) {
      this.setState({
        error: "Velicina slike ne smije biti veca od 3MB",
      });
    } else {
      console.log(localStorage.getItem("userid"));

      var fd = new FormData();
      fd.append("userid", this.state.userid);
      fd.append("name", this.state.name);
      fd.append("description", this.state.description);
      fd.append("price", this.state.price);
      fd.append("quantity", this.state.quantity);
      fd.append("image", this.state.image);
      console.log(this.state);
      axios
        .post("http://localhost:3001/product", fd)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  renderError() {
    if (this.state.error) {
      return <h1 className="red"> {this.state.error} </h1>;
    }
  }
  handleLogOut = () => {
    localStorage.removeItem("userid");
    this.setState({ userid: null });
  };

  renderLogOut() {
    if (this.state.userid) {
      return (
        <button
          className="ui red button"
          type="submit"
          onClick={this.handleLogOut}
        >
          Logout
        </button>
      );
    }
  }
  render() {
    console.log(this.state.error);
    const userid = this.state.userid;
    if (userid === null || typeof userid === "undefined" || userid === "") {
      this.props.history.push("/login");
    }
    return (
      <div>
        <div className="container">
          <div className="wrap wrap-login">
            <form
              className="form"
              onSubmit={this.onFormSubmit}
              autoComplete="off"
            >
              <span className="logo">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png"
                  alt="slika"
                />
              </span>{" "}
              <span className="header"> Product </span>{" "}
              <div className="centralize" style={{ margin: "1%" }}>
                <div className="ui left icon input login-width">
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    onChange={this.onInputChange}
                    value={this.state.name}
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="centralize" style={{ margin: "1%" }}>
                <div className="ui left icon input login-width">
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    onChange={this.onInputChange}
                    value={this.state.description}
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="centralize" style={{ margin: "1%" }}>
                <div className="ui left icon input login-width">
                  <input
                    id="price"
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={this.onInputChange}
                    value={this.state.price}
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="centralize" style={{ margin: "1%" }}>
                <div className="ui left icon input login-width">
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={this.onInputChange}
                    value={this.state.quantity}
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="centralize" style={{ margin: "1%" }}>
                <div className="ui left icon input login-width">
                  <div className="centralize" style={{ margin: "1%" }}>
                    <div className="ui left icon input login-width">
                      <label htmlFor="file">
                        {" "}
                        Select product image to upload
                      </label>
                      <input
                        type="file"
                        name="file"
                        placeholder="File"
                        onChange={this.onFileChange}
                      />
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="container-btn">
                <button className="ui button"> Send product data </button>{" "}
              </div>{" "}
              {this.renderError()}{" "}
              <div className="item">
                <a href="." className="ui item">{this.renderLogOut()}</a>
              </div>
              <div className="item">
                <Link to="/home" className="ui gray button">
                  See all products
                </Link>
              </div>
            </form>{" "}
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Product;
