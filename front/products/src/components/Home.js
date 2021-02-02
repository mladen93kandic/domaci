import React from "react";
import "../../src/App.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = {
    allProducts: [],
    userid: localStorage.getItem("userid"),
  };
  componentDidMount() {
    axios
      .get("http://localhost:3001/allproducts")
      .then((res) => {
        console.log(res.data);
        this.setState({
          allProducts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleDelete = (id) => {
    axios
      .post("http://localhost:3001/delete", { id: id })
      .then((response) => {
        let newProducts = this.state.allProducts.filter(
          (product) => product._id !== response.data
        );
        this.setState({
          allProducts: newProducts,
        });
      })
      .catch((error) => console.log(error));
  };

  renderButton = (product) => {
    if (product.userid === this.state.userid) {
      return (
        <>
          <Link to={`/edit/${product._id}`} className="ui blue button">
            Edit{" "}
          </Link>{" "}
          <button
            className="ui red button"
            onClick={() => this.handleDelete(product._id)}
          >
            {" "}
            Delete{" "}
          </button>{" "}
        </>
      );
    }
  };
  render() {
    if (this.state.userid) {
      var images = this.state.allProducts.map((product) => {
        console.log(product.image);
        return (
          <div key={product._id}>
            <h3> {product.name} </h3>{" "}
            <img src={product.image} target="_blank" alt="slika" />
            <div> {this.renderButton(product)} </div>{" "}
          </div>
        );
      });
    } else {
      images = [];
      this.props.history.push("/login");
    }
    return <div> {images} </div>;
  }
}

export default Home;
