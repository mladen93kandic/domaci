import React from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Product from "./components/Product";
import Home from "./components/Home";

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Login} />{" "}
        <Route path="/home" exact component={Home} />{" "}
        <Route path="/product" exact component={Product} />{" "}
        <Route path="/signup" exact component={Signup} />{" "}
        <Route path="/login" exact component={Login} />{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
