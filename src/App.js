import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

import './App.css';

class App extends React.Component {
  state = {
    prodList: [],
    categories: [],
    searchTerm: '',
    currCategory: '',
    unmadeSearch: true,
    cartItems: JSON.parse(localStorage.getItem('cart-items')) || [],
  };

  fetchCategories = async () => {
    const data = await getCategories();
    this.setState({
      categories: data,
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
    const { searchTerm, currCategory } = this.state;
    const products = await getProductsFromCategoryAndQuery(currCategory, searchTerm);
    this.setState({
      prodList: products.results,
      unmadeSearch: false,
    });
  };

  handleSetCategory = async ({ target }) => {
    const category = target.value;
    const products = await getProductsFromCategoryAndQuery(category);
    this.setState({
      prodList: products.results,
      unmadeSearch: false,
      currCategory: category,
    });
  };

  saveCartOnLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
  };

  handleChangeQuantity = ({ target }) => {
    const { name, value } = target;
    const { cartItems } = this.state;

    const cart = cartItems;
    const targetID = name;
    const product = cart.find(({ id }) => id === targetID);
    if (value === '-' && product.quantity > 1) {
      product.quantity -= 1;
    }
    if (value === '+') {
      product.quantity += 1;
    }
    this.setState({
      cartItems: cart,
    }, this.saveCartOnLocalStorage);
  };

  handleRemoveProduct = ({ target }) => {
    const { name } = target;
    const { cartItems } = this.state;
    const targetID = name;
    this.setState({
      cartItems: cartItems.filter(({ id }) => id !== targetID),
    }, this.saveCartOnLocalStorage);
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
          <Route
            exact
            path="/cart"
            render={ () => (
              <Cart
                handleChangeQuantity={ this.handleChangeQuantity }
                handleRemoveProduct={ this.handleRemoveProduct }
                cartItems={ cartItems }
              />
            ) }
          />
          <Route
            exact
            path="/products/:productId"
            render={ (props) => (
              <ProductDetail
                { ...props }
                handleAddToCart={ this.handleAddToCart }
              />
            ) }
          />
        </Switch>
      </main>
    );
  }
}

export default App;
