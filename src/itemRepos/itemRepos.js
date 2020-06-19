import React, { Component } from "react";
import s from "./itemRepos.module.css";
import { BsFillStarFill } from "react-icons/bs";

class itemRepos extends Component {
  openModal = (index) => {
    this.props.openModalFn(index);
  };
  render() {
    return (
      <div className={s.itemReposContainer}>
        <span
          onClick={() => this.openModal(this.props.index)}
          className={s.name}
        >
          {this.props.name}
        </span>
        <span className={s.stars}>
          {this.props.stargazers_count}
          <BsFillStarFill color="black" size="1rem"></BsFillStarFill>
        </span>
        <span className={s.update}>{this.props.updated_at}</span>
        <a
          href={this.props.html_url}
          className={s.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    );
  }
}

export default itemRepos;
