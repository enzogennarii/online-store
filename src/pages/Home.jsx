import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Products from '../components/Products';

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
      states } = this.props;

    const {
      prodList,
      categories,
      unmadeSearch,
    } = states;

    const emptyList = prodList.length === 0;

    return (
      <section className="home-page">
        <Link to="/cart" data-testid="shopping-cart-button">
          <button>Carrinho</button>
        </Link>
        <aside>
          <ul>
            { categories.map((category) => (
              <li key={ category.id }>
                <label htmlFor={ category.id } data-testid="category">
                  <input
                    type="radio"
                    name="categories"
                    onChange={ handleSetCategory }
                    value={ category.id }
                    id={ category.id }
                  />
                  {category.name}
                </label>
              </li>
            )) }
          </ul>
        </aside>
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
        <div>
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
