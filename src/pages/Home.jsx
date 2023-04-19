import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      prodList: [],
    };
  }

  async componentDidMount() {
    const response = await getCategories();
    this.setState({
      prodList: response,
    });
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
          {emptyList ? 'Digite algum termo de pesquisa ou escolha uma categoria.'
            : prodList.map((category) => (
              <label key={ category.id } htmlFor={ category.id } data-testid="category">
                <input type="radio" name="categories" id={ category.id } />
                {category.name}
              </label>
            ))}
        </p>
      </section>
    );
  }
}

export default Home;
