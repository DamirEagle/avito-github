import React, { Component } from 'react';
import "./paginationItem.css"
class paginationItem extends Component {
    render() {
        return (
            <span className={`pagination ${this.props.active ? " active" : ""}`} onClick={() => { this.pageChanged(this.props.num) }}>{this.props.num}</span>
        );
    }
    pageChanged = (newPage) => {
        this.props.pageChangedFn(newPage);
    }
}

export default paginationItem;