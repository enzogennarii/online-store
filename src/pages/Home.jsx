import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      prodList: [],
    };
  }

  render() {
    const { prodList } = this.state;
    const emptyList = prodList.length === 0;

    return (
      <section className="home-page">
        <Link to="/cart" data-testid="shopping-cart-button">
          <button>Carrinho</button>
        </Link>

        <p data-testid="home-initial-message">
          {emptyList ? 'Digite algum termo de pesquisa ou escolha uma categoria.' : ''}
        </p>
      </section>
    );
  }
}

export default Home;
