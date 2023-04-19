import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Products from '../components/Products';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      prodList: [],
      categories: [],
      searchTerm: '',
      unmadeSearch: true,
    };
  }

  async componentDidMount() {
    const response = await getCategories();
    this.setState({
      categories: response,
    });
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      searchTerm: value,
    });
  };

  handleClick = async () => {
    const { searchTerm } = this.state;
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=$${searchTerm}`);
    const products = await response.json();
    this.setState({
      prodList: products.results,
      unmadeSearch: false,
    });
  };

  handleChange = async ({ target }) => {
    const category = target.value;
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}`);
    const products = await response.json();
    this.setState({
      prodList: products.results,
      unmadeSearch: false,
    });
  };

  render() {
    const { prodList, unmadeSearch, categories } = this.state;
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
                    onChange={ this.handleChange }
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
          onChange={ this.handleSearch }
        />
        <button
          data-testid="query-button"
          onClick={ this.handleClick }
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
            : <Products emptyList={ emptyList } prodList={ prodList } /> }
        </div>
      </section>
    );
  }
}

// teste

export default Home;
