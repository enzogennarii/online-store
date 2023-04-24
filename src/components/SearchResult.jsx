import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Products from './Products';

class SearchResult extends Component {
  render() {
    const { unmadeSearch, handleAddToCart, prodList } = this.props;
    const emptyList = !prodList.length;
    return (
      <div className="search-result">
        {unmadeSearch
          ? (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : (
            <Products
              handleAddToCart={ handleAddToCart }
              emptyList={ emptyList }
              prodList={ prodList }
            />
          ) }
      </div>
    );
  }
}

SearchResult.propTypes = {
  handleAddToCart: PropTypes.func,
  prodList: PropTypes.arrayOf(PropTypes.shape({})),
  unmadeSearch: PropTypes.bool,
}.isRequired;

export default SearchResult;
