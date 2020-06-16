import React, { Component } from 'react';
import ModalWindow from './modalWindow';
import Axios from 'axios';


class modalWrapper extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            stargazers_count: 0,
            updated_at: "",
            avatar_url: "",
            login: "",
            languages: [],
            description: "",
            contributors: []
        }
    }
    componentDidMount() {
        const languages = Axios.get(this.props.modalData.languages_url)
        const contributors = Axios.get(this.props.modalData.contributors_url)
        Axios.all([languages, contributors])
            .then(Axios.spread((...allData) => {
                this.setState({
                    name: this.props.modalData.name,
                    stargazers_count: this.props.modalData.stargazers_count,
                    updated_at: this.props.modalData.updated_at,
                    avatar_url: this.props.modalData.avatar_url,
                    login: this.props.modalData.login,
                    languages: allData[0].data,
                    description: this.props.modalData.description,
                    contributors: allData[1].data
                })
                console.log(allData[0].data)
                console.log(allData[1].data)
            }))
    }
    closeModal = () => {
        this.props.closeModalFn();
    }
    render() {
        return (
            <div>
                <ModalWindow data={this.state} closeModalFn={this.closeModal}></ModalWindow>
            </div>
        );
    }
}

export default modalWrapper;