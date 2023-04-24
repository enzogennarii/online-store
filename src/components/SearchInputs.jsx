import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SearchInputs extends Component {
  render() {
    const { handleSearchInput, handleSearchButton } = this.props;
    return (
      <div className="search-inputs">
        <input
          type="text"
          data-testid="query-input"
          onChange={ handleSearchInput }
        />
        <button
          data-testid="query-button"
          onClick={ handleSearchButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

SearchInputs.propTypes = {
  handleSearchButton: PropTypes.func,
  handleSearchInput: PropTypes.func,
}.isRequired;

export default SearchInputs;
