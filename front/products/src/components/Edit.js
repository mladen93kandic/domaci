import React from "react";
import "../../src/App.css";
import axios from "axios";

class Edit extends React.Component {
  state = {
    editProduct: [],
    userid: localStorage.getItem("userid"),
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/allproducts")
      .then((res) => {
        this.setState({
          editProduct: res.data.filter(
            (product) => product._id === this.props.match.params.id
          ),
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.props.match.params.id);
    console.log(this.state.editProduct);
    return <>Edit component</>;
  }
}

export default Edit;






  










