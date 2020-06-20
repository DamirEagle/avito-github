import React, { Component } from "react";
import ModalWindow from "./modalWindow";
import Axios from "axios";
import {
  LIMIT_MODAL,
  DATE_MODAL,
  X_RATELIMIT_REMAIING,
  X_RATELIMIT_RESET,
} from "../constants";

class modalWrapper extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      stargazers_count: 0,
      updated_at: "",
      avatar_url: "",
      login: "",
      url: "",
      languages: [],
      description: "",
      contributors: [],
    };
  }
  componentDidMount() {
    const languages = Axios.get(this.props.modalData.languages_url);
    const contributors = Axios.get(this.props.modalData.contributors_url);
    Axios.all([languages, contributors]).then(
      Axios.spread((...allData) => {
        console.log(`--------${allData}`);
        this.setState({
          name: this.props.modalData.name,
          stargazers_count: this.props.modalData.stargazers_count,
          updated_at: this.props.modalData.updated_at,
          avatar_url: this.props.modalData.avatar_url,
          login: this.props.modalData.login,
          html_url: this.props.modalData.html_url,
          languages: allData[0].data,
          description: this.props.modalData.description,
          contributors: allData[1].data,
        });
        console.log(allData[0].headers["x-ratelimit-reset"]);
        const latestData =
          allData[0].headers[X_RATELIMIT_REMAIING] >
          allData[1].headers[X_RATELIMIT_REMAIING]
            ? allData[1]
            : allData[0];
        localStorage.setItem(
          LIMIT_MODAL,
          latestData.headers[X_RATELIMIT_REMAIING]
        );
        localStorage.setItem(DATE_MODAL, latestData.headers[X_RATELIMIT_RESET]);
      })
    );
  }
  closeModal = () => {
    this.props.closeModalFn();
  };
  render() {
    return (
      <div>
        <ModalWindow
          data={this.state}
          closeModalFn={this.closeModal}
        ></ModalWindow>
      </div>
    );
  }
}

export default modalWrapper;
