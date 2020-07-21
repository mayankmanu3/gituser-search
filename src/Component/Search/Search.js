import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    search_query: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  };

  onInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.searchUsers(this.state.search_query);
    this.setState({ search_query: "" });
  };

  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='search_query'
            placeholder='search user...'
            onChange={this.onInput}
            value={this.state.search_query}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {this.props.showClear && (
          <input
            type='button'
            value='clear'
            className='btn btn-light btn-block'
            onClick={this.props.clearUsers}
          />
        )}
      </div>
    );
  }
}

export default Search;
