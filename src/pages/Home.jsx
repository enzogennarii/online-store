import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import SearchInputs from '../components/SearchInputs';
import SearchResult from '../components/SearchResult';

class Home extends Component {
  async componentDidMount() {
    const { fetchCategories } = this.props;
    await fetchCategories();
  }

  render() {
    const { handleAddToCart,
      handleSearchInput,
      handleSearchButton,
      handleSetCategory,
      cartAmount,
      states } = this.props;

    const {
      prodList,
      categories,
      unmadeSearch,
    } = states;

    return (
      <section className="home-page">
        <Link to="/cart" data-testid="shopping-cart-button">
          <>
            <button>Carrinho</button>
            <span data-testid="shopping-cart-size">
              {cartAmount}
            </span>
          </>
        </Link>

        <Categories
          handleSetCategory={ handleSetCategory }
          categories={ categories }
        />
        <SearchInputs
          handleSearchInput={ handleSearchInput }
          handleSearchButton={ handleSearchButton }
        />
        <SearchResult
          unmadeSearch={ unmadeSearch }
          handleAddToCart={ handleAddToCart }
          prodList={ prodList }
        />
      </section>
    );
  }
}

Home.propTypes = {
  fetchCategories: PropTypes.func,
  handleAddToCart: PropTypes.func,
  handleSearchButton: PropTypes.func,
  handleSearchInput: PropTypes.func,
  handleSetCategory: PropTypes.func,
  states: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    prodList: PropTypes.arrayOf(PropTypes.shape({})),
    unmadeSearch: PropTypes.bool,
  }),
}.isRequired;

export default Home;
