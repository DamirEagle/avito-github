import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile/Profile";
import NavBar from "./navBar/navBar";
import MainSearch from "./mainSearch";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar></NavBar>
          <Route exact path="/" component={MainSearch}></Route>
          <Route path="/profile" component={Profile}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
