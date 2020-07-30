import React, { useState, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Component/Layout/Navbar";
import UsersList from "./Component/Users/UsersList";
import User from "./Component/Users/User";
import Search from "./Component/Search/Search";
import Alert from "./Component/Layout/Alert";
import About from "./Pages/About";
import GithubState from "./Context/Github/GithubState";

export const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <GithubState>
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
                    <Search setAlert={showAlert} />
                    <UsersList />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username' component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
