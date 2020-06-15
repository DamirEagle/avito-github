import React, { Component } from 'react';
import ListRepos from './listRepos/listRepos';
import Search from './search/search';
import Loader from './Loader/Loader';
import { avito, per_page } from './constants';
import PaginationList from './paginationList/paginationList';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      isLoaded: false,
      search: "",
      currentPage: 1,
      totalCount: 0,
      didMount: false
    };
  }
  render() {
    return (
      <div>
        {
          localStorage.getItem("limit") * 1 > 3 ?
            <Search onInputChange={this.onInputChange} search={this.state.search} /> :
            <div>Лимит достигнут, подождите</div>
        }
        {
          console.log(this.state.totalCount)
        }
        {
          this.state.isLoaded ?
            <div>
              <ListRepos json={this.state.data} />
              {
                localStorage.getItem("limit") * 1 > 3 ?
                  <PaginationList pageChangedFn={this.pageChanged} currentPage={this.state.currentPage} totalCount={this.state.totalCount}></PaginationList> :
                  <div>Лимит достигнут, подождите</div>
              }

            </div> : <Loader></Loader>
        }
      </div>
    );
  }
  onInputChange = async (search) => {
    if (localStorage.getItem("limit") * 1 > 3) {
      if (this.state.didMount) {
        await this.setState({ ...this.state, isLoaded: false, currentPage: 1, search })
        localStorage.setItem("currentPage", 1)
        this.githubQuerry();
      }
    }
  }
  newLimit = async () => {
    await this.setState({ ...this.state, didMount: false, isLoaded: false })
    localStorage.setItem("limit", 10)
    this.githubQuerry();
    setTimeout(() => {
      this.setState({ ...this.state, didMount: true })//didMount нужен, чтобы onInputChange не сработал и не обновил страницу
    }, 3000)
  }
  async componentDidMount() {
    if (localStorage.getItem("limit") === null) {
      localStorage.setItem("limit", 10)
    }
    if (localStorage.getItem("limit") * 1 > 3) {
      await this.setState({ ...this.state, currentPage: localStorage.getItem("currentPage") * 1, search: localStorage.getItem("search") })
      this.githubQuerry();
      setTimeout(() => {
        this.setState({ ...this.state, didMount: true })
      }, 3000)
    }
    setInterval(this.newLimit, 65000);
  }
  githubQuerry = () => {
    try {
      fetch(`https://api.github.com/search/repositories?q=${this.state.search ? this.state.search : avito}&page=${this.state.currentPage}&per_page=${per_page}&sort=stars&order=desc`)
        .then(res => res.json())
        .then(async data => {
          await this.setState({ ...this.state, data: data.items, isLoaded: true, totalCount: data.total_count })
          localStorage.setItem("limit", localStorage.getItem("limit") * 1 - 1)
        })
      console.log("сработал githubQuerry")
    } catch (e) {

    }
  }
  pageChanged = async (newPage) => {
    if (localStorage.getItem("limit") * 1 > 3) {
      if (this.state.currentPage !== newPage) {
        localStorage.setItem("currentPage", String(newPage))

        await this.setState({ ...this.state, isLoaded: false, currentPage: newPage })
        this.githubQuerry();
      }
    }
  }
}

export default App;