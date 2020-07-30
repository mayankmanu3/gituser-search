import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../Context/Github/githubContext";

export const Search = ({ showClear, clearUsers, setAlert }) => {
  const githubContext = useContext(GithubContext);

  const [search_query, setSearch_query] = useState("");

  const onInput = (event) => setSearch_query(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (search_query === "") {
      setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(search_query);
      setSearch_query("");
    }
  };
  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='search_query'
          placeholder='search user...'
          onChange={onInput}
          value={search_query}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <input
          type='button'
          value='clear'
          className='btn btn-light btn-block'
          onClick={clearUsers}
        />
      )}
    </div>
  );
};

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
