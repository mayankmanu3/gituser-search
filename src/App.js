import React, { Component } from "react";
import "./App.css";
import Navbar from "./Component/Layout/Navbar";
import UsersList from "./Component/Users/UsersList";
import axios from "axios";
import Search from "./Component/Search/Search";
import { Alert } from "./Component/Layout/Alert";

export class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

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

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
    });
  };

  setAlert = (message, type) => {
    this.setState({
      alert: {
        message,
        type,
      },
    });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 2000);
  };

  render() {
    const { loading, users, alert } = this.state;
    return (
      <div className='App'>
        <Navbar title='Github-Finder' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <UsersList loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
