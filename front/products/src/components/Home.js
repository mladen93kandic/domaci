import React from "react";
import "../../src/App.css";
import axios from "axios";

class Home extends React.Component {
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

  state = {
    allProducts: [],
  };

  render() {
    const images = this.state.allProducts.map((product) => {
      console.log(product.image);
      return <img src={product.image} alt="slika" />;
    });
    console.log(images);
    console.log(this.state.allProducts);

    return <div>{images}</div>;
  }
}

export default Home;
