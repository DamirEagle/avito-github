import React, { Component } from "react";
import { arrayOfPages } from "../constants";
import PaginationItem from "../paginationItem/paginationItem";

class paginationList extends Component {
  render() {
    return (
      <div>
        <span
          onClick={() => {
            this.changedToTheLeft();
          }}
        >
          &lt;
        </span>
        {this.props.totalCount > 100
          ? arrayOfPages.map((num, index) => (
              <PaginationItem
                pageChangedFn={this.pageChaged}
                key={index}
                num={num}
                active={this.props.currentPage === num ? true : false}
              />
            ))
          : this.newArrayOfPagesMaker(this.props.totalCount)}
        <span
          onClick={() => {
            this.changedToTheRight(this.props.totalCount);
          }}
        >
          &gt;
        </span>
      </div>
    );
  }
  changedToTheLeft = () => {
    if (this.props.currentPage > 1) {
      this.pageChaged(this.props.currentPage - 1);
    }
  };
  changedToTheRight = (totalCount) => {
    if (
      this.props.currentPage <
      (totalCount > 100 ? 10 : Math.ceil(totalCount / 10))
    ) {
      this.pageChaged(this.props.currentPage + 1);
    }
  };
  pageChaged = (newPage) => {
    this.props.pageChangedFn(newPage);
  };
  newArrayOfPagesMaker = (totalCount) => {
    let newArrayOfPages = [];
    for (let i = 1; i <= Math.ceil(totalCount / 10); i++) {
      newArrayOfPages.push(i);
    }
    return newArrayOfPages.map((num, index) => (
      <PaginationItem
        pageChangedFn={this.pageChaged}
        key={index}
        num={num}
        active={this.props.currentPage === num ? true : false}
      />
    ));
  };
}

export default paginationList;
