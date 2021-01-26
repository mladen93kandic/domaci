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
    userid: localStorage.getItem("userid"),
  };

  renderButton = (productid) => {
    console.log(productid);
    console.log(this.state.userid);
    if(productid===this.state.userid) {
      return(
        <>
        <button>Edit</button>
        <button>Delete</button>
        </>
      );
    };
  };
  render() {
    const images = this.state.allProducts.map((product) => {
      console.log(product.image);
      return ( 
      <div key={product._id}>
        <img src={product.image} alt="slika" />
        <div>{this.renderButton(product.userid)}</div>
      </div>
      );
    });
    console.log(images);
    console.log(this.state.allProducts);

    return <div> {images} </div>;
  }
}

export default Home;
