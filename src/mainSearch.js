import React, { Component } from "react";
import "./App.css";
import ListRepos from "./listRepos/listRepos";
import SearchInput from "./searchInput/searchInput";
import Loader from "./Loader/Loader";
import {
  AVITO,
  SEARCH,
  LIMIT_APP,
  CURRANT_PAGE,
  PER_PAGE,
  X_RATELIMIT_REMAIING,
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
          <div className="secondContainer">
            <ListRepos data={this.state.data} />
            {localStorage.getItem(LIMIT_APP) * 1 > 1 &&
            this.state.totalCount > 10 ? (
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
      localStorage.setItem(CURRANT_PAGE, 1);
      console.log("сработал opInputChange");
      this.githubQuerry();
    }
  };
  newLimit = async () => {
    if (!this.state.isLoaded) {
    }
    console.log("сработал newLimit");
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
            this.state.search ? this.state.search : AVITO
          }&page=${
            this.state.currentPage
          }&per_page=${PER_PAGE}&sort=stars&order=desc`
        )
          .then((res) => {
            localStorage.setItem(
              LIMIT_APP,
              String(res.headers.get(X_RATELIMIT_REMAIING))
            );
            console.log(res.headers.get(X_RATELIMIT_REMAIING));
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
      console.log("сработал pageChanged");
      this.githubQuerry();
    }
  };
}

export default App;
