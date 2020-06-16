import React, { Component } from 'react';

class itemRepos extends Component {

    openModal = (index) => {
        this.props.openModalFn(index)
    }
    render() {
        return (
            <div>
                <br></br>
                <span onClick={() => this.openModal(this.props.index)}>{this.props.name + " | "}</span>
                <span>{this.props.stargazers_count + " | "}</span>
                <span>{this.props.updated_at + " | "}</span>
                <a href={this.props.html_url}>Github</a>
                <br></br>
            </div>
        )
    }
}

export default itemRepos;