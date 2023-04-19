import React, { Component } from 'react';
import Products from '../components/Products';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      prodList: [],
      searchTerm: '',
      unmadeSearch: true,
    };
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

  render() {
    const { prodList, unmadeSearch } = this.state;
    const emptyList = prodList.length === 0;

    return (
      <section>
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

export default Home;
