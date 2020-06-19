import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile/Profile";
import Comments from "./Comments/Comments";
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
          <Route path="/comments" component={Comments}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
