import React, { Component } from "react";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import s from "./navBar.module.css";
class navBar extends Component {
  render() {
    return (
      <nav className={s.container}>
        <div className={s.item}>
          <NavLink to="/">
            <BsSearch color="white" size="1rem"></BsSearch>
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/profile" className={s.nav}>
            Profile
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/comments">Comments</NavLink>
        </div>
      </nav>
    );
  }
}

export default navBar;
