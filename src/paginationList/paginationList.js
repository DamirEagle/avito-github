import React, { Component } from 'react';
import { arrayOfPages } from '../constants';
import PaginationItem from '../paginationItem/paginationItem';

class paginationList extends Component {
    newArrayOfPages = []

    render() {
        return (
            <div>
                {
                    this.props.totalCount > 100 ?
                        arrayOfPages.map((num, index) => <PaginationItem pageChangedFn={this.pageChaged} key={index} num={num} active={this.props.currentPage === num ? true : false} />) :
                        this.newArrayOfPagesMaker(this.props.totalCount)

                }
            </div>
        );
    }
    pageChaged = (newPage) => {
        this.props.pageChangedFn(newPage)
    }
    newArrayOfPagesMaker = (totalCount) => {
        for (let i = 1; i <= Math.ceil(totalCount / 10); i++) {
            this.newArrayOfPages.push(i);
        }
        return (
            this.newArrayOfPages.map((num, index) => <PaginationItem pageChangedFn={this.pageChaged} key={index} num={num} active={this.props.currentPage === num ? true : false} />)
        )
    }
}

export default paginationList;