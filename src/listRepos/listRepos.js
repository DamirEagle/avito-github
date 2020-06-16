import React, { Component } from 'react';
import ItemRepos from "../itemRepos/itemRepos"
import ModalWrapper from '../Modal/modalWrapper';

class listRepos extends Component {
    constructor(props) {
        super();
        this.state = {
            index: 0,
            name: "",
            stargazers_count: 0,
            updated_at: "",
            avatar_url: "",
            login: "",
            languages_url: "",
            description: "",
            contributors_url: "",
            openModal: false
        }
    }
    openModal = (index) => {
        this.setModalData(index)
    }
    closeModal = () => {
        this.setState({ ...this.state, openModal: false })
    }

    setModalData = async (index) => {
        await this.setState({
            index,
            name: this.props.data[index].name,
            stargazers_count: this.props.data[index].stargazers_count,
            updated_at: this.props.data[index].updated_at,
            avatar_url: this.props.data[index].owner.avatar_url,
            login: this.props.data[index].owner.login,
            languages_url: this.props.data[index].languages_url,
            description: this.props.data[index].description,
            contributors_url: `${this.props.data[index].contributors_url}?page=1&per_page=10`,
            openModal: true
        })
    }

    render() {
        return (
            <div>

                {this.props.data.map((item, index) => <ItemRepos key={index} index={index} name={item.name} stargazers_count={item.stargazers_count} updated_at={item.updated_at} login={item.owner.login} html_url={item.html_url} openModalFn={(i) => this.openModal(i)}></ItemRepos>)}
                {
                    this.state.openModal ? <ModalWrapper closeModalFn={this.closeModal} modalData={this.state}></ModalWrapper> : null
                }
            </div>
        );
    }
}

export default listRepos;