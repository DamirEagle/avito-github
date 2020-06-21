import React from "react";
import { SEARCH } from "../constants";
import "./searchInput.css";

class searchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      timerActivated: false,
    };
  }
  async componentDidMount() {
    if (this.state.search !== localStorage.getItem(SEARCH)) {
      await this.setState({
        ...this.state,
        search: localStorage.getItem(SEARCH),
      });
      if (!this.state.timerActivated) {
        await this.setState({ ...this.state, timerActivated: true });
        setTimeout(this.inOneSecond, 1500);
      }
    }
  }
  render() {
    return (
      <form className="container">
        <input
          type="text"
          onChange={(e) => {
            this.onInputChange(e);
          }}
          placeholder="search"
          value={this.state.search}
        ></input>
        <span className="bar"></span>
      </form>
    );
  }

  onInputChange = async (e) => {
    localStorage.setItem(SEARCH, e.target.value);
    await this.setState({ ...this.state, search: e.target.value });
    if (!this.state.timerActivated) {
      await this.setState({ ...this.state, timerActivated: true });
      setTimeout(this.inOneSecond, 1000);
    }
  };

  inOneSecond = () => {
    this.props.onInputChange(this.state.search);
    this.setState({ ...this.state, timerActivated: false });
  };
}

export default searchInput;
