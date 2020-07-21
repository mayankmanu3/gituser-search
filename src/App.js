import React, { Component } from "react";
import "./App.css";
import Navbar from "./Component/Layout/Navbar";
import UsersList from "./Component/Users/UsersList";
import axios from "axios";
import Search from "./Component/Search/Search";

export class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  // componentDidMount = async () => {
  //   this.setState({
  //     loading: true,
  //   });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_CLIENT_SECRET}`
  //   );
  //   if (res.status === 200) {
  //     return this.setState({
  //       users: res.data,
  //       loading: false,
  //     });
  //   }
  //   return console.log(res.status);
  // };

  searchUsers = async (search_query) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${search_query}&client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_CLIENT_SECRET}`
    );
    if (res.status === 200) {
      return this.setState({
        users: res.data.items,
        loading: false,
      });
    }
    return console.log(res.status);
  };

  render() {
    return (
      <div className='App'>
        <Navbar title='Github-Finder' icon='fab fa-github' />
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <UsersList loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
