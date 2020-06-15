import React, { Component } from 'react';

class itemRepos extends Component {
    constructor(props) {
        super();
        this.state = {
            name: "",
            stars: "",
            commitTime: "",
            html_url: ""
        };
    }

    render() {
        return (
            <div>
                <br></br>
                <span>{this.props.name + " | "}</span>
                <span>{this.props.stargazers_count + " | "}</span>
                <span>{this.props.updated_at + " | "}</span>
                <a href={this.props.html_url}>Github</a>
                <br></br>
            </div>
        )
    }
}

export default itemRepos;