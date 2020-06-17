import React, { Component } from "react";
import ListRepos from "./listRepos/listRepos";
import Search from "./search/search";
import Loader from "./Loader/Loader";
import { avito, per_page } from "./constants";
import PaginationList from "./paginationList/paginationList";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      isLoaded: false,
      search: "",
      currentPage: 1,
      totalCount: 0,
      didMount: false,
    };
  }
  render() {
    return (
      <div>
        {localStorage.getItem("limit") * 1 > 1 ? (
          <Search
            onInputChange={this.onInputChange}
            search={this.state.search}
          />
        ) : (
          <div>Лимит достигнут, подождите</div>
        )}
        {this.state.isLoaded ? (
          <div>
            <ListRepos data={this.state.data} />
            {localStorage.getItem("limit") * 1 > 1 ? (
              <PaginationList
                pageChangedFn={this.pageChanged}
                currentPage={this.state.currentPage}
                totalCount={this.state.totalCount}
              ></PaginationList>
            ) : (
              <div>Лимит достигнут, подождите</div>
            )}
          </div>
        ) : (
          <Loader></Loader>
        )}
      </div>
    );
  }

  onInputChange = async (search) => {
    if (this.state.didMount) {
      await this.setState({
        ...this.state,
        isLoaded: false,
        currentPage: 1,
        search,
      });
      localStorage.setItem("currentPage", 1);
      this.githubQuerry();
    }
  };
  newLimit = async () => {
    if (!this.state.isLoaded) {
    }
    await this.setState({ ...this.state, didMount: false });
    localStorage.setItem("limit", 10);
    this.setState({ ...this.state });
    setTimeout(() => {
      this.setState({ ...this.state, didMount: true });
    }, 3000);
  };

  async componentDidMount() {
    await this.setState({
      ...this.state,
      didMount: false,
      currentPage: localStorage.getItem("currentPage") * 1,
      search: localStorage.getItem("search"),
    });
    await this.githubQuerry();
    setTimeout(() => {
      this.setState({ ...this.state, didMount: true });
    }, 3000);
    setInterval(this.newLimit, 60000);
  }
  githubQuerry = () => {
    if (localStorage.getItem("limit") > 1) {
      fetch(
        `https://api.github.com/search/repositories?q=${
          this.state.search ? this.state.search : avito
        }&page=${
          this.state.currentPage
        }&per_page=${per_page}&sort=stars&order=desc`
      )
        .then((res) => {
          localStorage.setItem(
            "limit",
            res.headers.get("x-ratelimit-remaining")
          );
          console.log(res.headers.get("x-ratelimit-remaining"));
          return res.json();
        })
        .then(async (data) => {
          await this.setState({
            ...this.state,
            data: data.items,
            isLoaded: true,
            totalCount: data.total_count,
          });
        });
      console.log("сработал githubQuerry");
    }
    setTimeout(() => {
      localStorage.setItem("limit", 10);
      this.githubQuerry();
    }, 60000);
  };
  pageChanged = async (newPage) => {
    if (this.state.currentPage !== newPage) {
      localStorage.setItem("currentPage", String(newPage));
      await this.setState({
        ...this.state,
        isLoaded: false,
        currentPage: newPage,
      });
      this.githubQuerry();
    }
  };
}

export default App;
