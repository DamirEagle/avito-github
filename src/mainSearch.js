import React, { Component } from "react";
import "./App.css";
import ListRepos from "./listRepos/listRepos";
import SearchInput from "./searchInput/searchInput";
import Loader from "./Loader/Loader";
import {
  MOST_STARRED,
  SEARCH,
  LIMIT_APP,
  CURRANT_PAGE,
  PER_PAGE,
  X_RATELIMIT_REMAINING,
} from "./constants";
import PaginationList from "./paginationList/paginationList";

class App extends Component {
  LIMIT;
  constructor(props) {
    super(props);
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
      <div className="mainContainer">
        {localStorage.getItem(LIMIT_APP) * 1 > 1 ? (
          <SearchInput
            onInputChange={this.onInputChange}
            search={this.state.search}
          />
        ) : (
          <div>Лимит достигнут, подождите</div>
        )}
        {this.state.isLoaded ? (
          <div className="listPaginationContainer">
            <ListRepos data={this.state.data} />
            {localStorage.getItem(LIMIT_APP) * 1 > 1 ? (
              this.state.totalCount > 10 &&
              localStorage.getItem(SEARCH) !== "" ? (
                <PaginationList
                  pageChangedFn={this.pageChanged}
                  currentPage={this.state.currentPage}
                  totalCount={this.state.totalCount}
                ></PaginationList>
              ) : (
                <div></div>
              )
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
      localStorage.setItem(CURRANT_PAGE, 1);
      this.githubQuerry();
    }
  };
  newLimit = async () => {
    await this.setState({ ...this.state, didMount: false });
    localStorage.setItem(LIMIT_APP, 10);
    this.setState({ ...this.state });
    setTimeout(() => {
      this.setState({ ...this.state, didMount: true, isLoaded: true });
    }, 3000);
  };

  async componentDidMount() {
    if (localStorage.getItem(SEARCH) === null) localStorage.setItem(SEARCH, "");
    if (localStorage.getItem(LIMIT_APP) === null)
      localStorage.setItem(LIMIT_APP, 10);
    if (localStorage.getItem(CURRANT_PAGE) === null)
      localStorage.setItem(CURRANT_PAGE, 1);

    await this.setState({
      ...this.state,
      didMount: false,
      currentPage: localStorage.getItem(CURRANT_PAGE) * 1,
      search: localStorage.getItem(SEARCH),
    });
    await this.githubQuerry();
    setTimeout(() => {
      this.setState({ ...this.state, didMount: true });
    }, 3000);
    setInterval(this.newLimit, 60000);
  }
  githubQuerry = () => {
    try {
      if (localStorage.getItem(LIMIT_APP) * 1 > 1) {
        fetch(
          `https://api.github.com/search/repositories?q=${
            this.state.search ? this.state.search : MOST_STARRED
          }&page=${
            this.state.currentPage
          }&per_page=${PER_PAGE}&sort=stars&order=desc`
        )
          .then((res) => {
            localStorage.setItem(
              LIMIT_APP,
              String(res.headers.get(X_RATELIMIT_REMAINING))
            );
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
      } else
        setTimeout(() => {
          localStorage.setItem(LIMIT_APP, 10);
          this.githubQuerry();
        }, 60000);
    } catch (error) {
      console.log(error);
    }
  };
  pageChanged = async (newPage) => {
    if (this.state.currentPage !== newPage) {
      localStorage.setItem(CURRANT_PAGE, String(newPage));
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
