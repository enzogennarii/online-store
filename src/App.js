import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import { getCategories } from './services/api';

import './App.css';

class App extends React.Component {
  state = {
    prodList: [],
    categories: [],
    searchTerm: '',
    unmadeSearch: true,
    cartItems: [],
  };

  fetchCategories = async () => {
    const response = await getCategories();
    this.setState({
      categories: response,
    });
  };

  handleAddToCart = ({ target }) => {
    const { cartItems, prodList } = this.state;
    const prodId = target.name;
    const product = prodList.find(({ id }) => id === prodId);
    if (!(cartItems.some((item) => prodId === item.id))) {
      product.quantity = 1;
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, product],
      }), () => this.saveCartOnLocalStorage());
    } else {
      product.quantity += 1;
      this.saveCartOnLocalStorage();
    }
  };

  handleSearchInput = ({ target }) => {
    const { value } = target;
    this.setState({
      searchTerm: value,
    });
  };

  handleSearchButton = async () => {
    const { searchTerm } = this.state;
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=$${searchTerm}`);
    const products = await response.json();
    this.setState({
      prodList: products.results,
      unmadeSearch: false,
    });
  };

  handleSetCategory = async ({ target }) => {
    const category = target.value;
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}`);
    const products = await response.json();
    this.setState({
      prodList: products.results,
      unmadeSearch: false,
    });
  };

  saveCartOnLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
  };

  render() {
    const { prodList, categories, unmadeSearch, cartItems } = this.state;
    const states = {
      prodList,
      categories,
      unmadeSearch,
    };
    return (
      <main className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              fetchCategories={ this.fetchCategories }
              handleAddToCart={ this.handleAddToCart }
              handleSearchInput={ this.handleSearchInput }
              handleSearchButton={ this.handleSearchButton }
              handleSetCategory={ this.handleSetCategory }
              states={ states }
            />) }
          />
          <Route exact path="/cart" render={ () => <Cart cartItems={ cartItems } /> } />
          <Route exact path="/products/:productId" component={ ProductDetail } />
        </Switch>
      </main>
    );
  }
}

export default App;
