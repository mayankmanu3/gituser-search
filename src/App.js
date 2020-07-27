import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Component/Layout/Navbar";
import UsersList from "./Component/Users/UsersList";
import User from "./Component/Users/User";
import axios from "axios";
import Search from "./Component/Search/Search";
import Alert from "./Component/Layout/Alert";
import About from "./Pages/About";

export class App extends Component {
  state = {
    users: [],
    repos: [],
    user: {},
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

  getUser = async (username) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_CLIENT_SECRET}`
    );
    if (res.status === 200) {
      return this.setState({
        user: res.data,
        loading: false,
      });
    }
    return console.log(res.status);
  };

  getUserRepos = async (username) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIT_CLIENT_SECRET}`
    );
    if (res.status === 200) {
      return this.setState({
        repos: res.data,
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
    const { loading, users, alert, user, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar title='Github-Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <UsersList loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:username'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
