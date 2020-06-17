import React, { Component } from 'react';
import { arrayOfPages } from '../constants';
import PaginationItem from '../paginationItem/paginationItem';

class paginationList extends Component {

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
        let newArrayOfPages = []
        for (let i = 1; i <= Math.ceil(totalCount / 10); i++) {
            newArrayOfPages.push(i);
        }
        return (
            newArrayOfPages.map((num, index) => <PaginationItem pageChangedFn={this.pageChaged} key={index} num={num} active={this.props.currentPage === num ? true : false} />)
        )
    }
}

export default paginationList;