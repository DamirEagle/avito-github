import React, { Component } from "react";
import s from "./paginationItem.module.css";
class paginationItem extends Component {
  render() {
    return (
      <span
        className={`${s.pagination} ${
          this.props.active ? ` ${s.active}` : ""
        } ${s.itemConteiner}`}
        onClick={() => {
          this.pageChanged(this.props.num);
        }}
      >
        {this.props.num}
      </span>
    );
  }
  pageChanged = (newPage) => {
    this.props.pageChangedFn(newPage);
  };
}

export default paginationItem;
