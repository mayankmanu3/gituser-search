import React, { Component } from "react";

export class Search extends Component {
  state = {
    search_query: "",
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
      </div>
    );
  }
}

export default Search;
