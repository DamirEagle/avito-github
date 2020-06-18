import React, { Component } from "react";
import ListRepos from "./listRepos/listRepos";
import SearchInput from "./search/search";
import Loader from "./Loader/Loader";
import { AVITO, SEARCH, LIMIT, CURRANT_PAGE, PER_PAGE } from "./constants";
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
          <SearchInput
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
      console.log("сработал opInputChange");
      this.githubQuerry();
    }
  };
  newLimit = async () => {
    if (!this.state.isLoaded) {
    }
    console.log("сработал newLimit");
    await this.setState({ ...this.state, didMount: false });
    localStorage.setItem("limit", 10);
    this.setState({ ...this.state });
    setTimeout(() => {
      this.setState({ ...this.state, didMount: true, isLoaded: true });
    }, 3000);
  };

  async componentDidMount() {
    if (localStorage.getItem(SEARCH) === null) localStorage.setItem(SEARCH, "");
    if (localStorage.getItem(LIMIT) === null) localStorage.setItem(LIMIT, 10);
    if (localStorage.getItem(CURRANT_PAGE) === null)
      localStorage.setItem(CURRANT_PAGE, 1);

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
    if (localStorage.getItem("limit") * 1 > 1) {
      fetch(
        `https://api.github.com/search/repositories?q=${
          this.state.search ? this.state.search : AVITO
        }&page=${
          this.state.currentPage
        }&per_page=${PER_PAGE}&sort=stars&order=desc`
      )
        .then((res) => {
          localStorage.setItem(
            "limit",
            String(res.headers.get("x-ratelimit-remaining"))
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
    } else
      setTimeout(() => {
        console.log("сработал Timeout в githubQuerry");
        localStorage.setItem("limit", 10);
        this.githubQuerry();
      }, 60000);
  };
  pageChanged = async (newPage) => {
    if (this.state.currentPage !== newPage) {
      localStorage.setItem(CURRANT_PAGE, String(newPage));
      await this.setState({
        ...this.state,
        isLoaded: false,
        currentPage: newPage,
      });
      console.log("сработал pageChanged");
      this.githubQuerry();
    }
  };
}

export default App;
