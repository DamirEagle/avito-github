import React, { Component } from 'react';
import "./modal.css"

class modalWindow extends Component {
    closeModal = () => {
        console.log("happened")
        this.props.closeModalFn()
    }
    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    {this.props.data.name}
                    {this.props.data.stargazers_count}
                    {this.props.data.updated_at}
                    {this.props.data.avatar_url}
                    {this.props.data.login}
                    <div>------------</div>
                    {<div onClick={() => this.closeModal()}>{this.props.data.languages.JavaScript}</div>}
                    <div>------------</div>
                    {this.props.data.description}
                    {//this.props.data.contributors.map((contributor, index) => <div key={index}>{contributor.login}</div>)}
                        console.log(this.props.data.contributors)
                    }
                    <div>
                        <button onClick={() => this.closeModal()}>close</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default modalWindow;