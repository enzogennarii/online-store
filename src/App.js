import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
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
    email: '',
    detail: '',
    isValidForm: true,
    rating: '',
    prodEval: {},
    cartAmount: localStorage.getItem('cart-amount') || 0,
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
    const prodCart = cartItems.find((item) => prodId === item.id);
    if (!(prodCart)) {
      product.quantity = 1;
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, product],
      }), this.saveCartOnLocalStorage);
    } else {
      prodCart.quantity += 1;
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
    this.cartItemsQuantity();
  };

  saveProdEvalOnLocalStorage = () => {
    const { prodEval } = this.state;
    const prodEvalIds = Object.keys(prodEval);
    if (prodEvalIds !== []) {
      prodEvalIds.forEach((id) => {
        localStorage.setItem(id, JSON.stringify(prodEval[id]));
      });
    }
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

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleValidateForm = ({ target }) => {
    const { email, rating } = this.state;
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const erros = [!emailRegex.test(email), !rating.length];
    this.setState({
      isValidForm: erros.every((erro) => erro === false),
    }, () => this.submitForm(target.name));
  };

  submitForm = (name) => {
    const { email, rating, detail, prodEval, isValidForm } = this.state;
    if (isValidForm) {
      const evaluation = {
        email,
        text: detail,
        rating,
      };
      prodEval[name] = prodEval[name] ? [...prodEval[name], evaluation] : [evaluation];
      this.saveProdEvalOnLocalStorage();
      this.setState({
        email: '',
        detail: '',
        rating: '',
      });
    }
  };

  cartItemsQuantity = () => {
    const { cartItems } = this.state;
    const amount = cartItems.reduce((acc, curr) => {
      acc += curr.quantity;
      return acc;
    }, 0);
    localStorage.setItem('cart-amount', amount);
    this.setState({
      cartAmount: amount,
    });
  };

  render() {
    const { prodList,
      categories,
      unmadeSearch,
      cartItems,
      email,
      detail,
      isValidForm,
      cartAmount,
    } = this.state;
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
              cartAmount={ cartAmount }
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
                handleChangeForm={ this.handleChangeForm }
                email={ email }
                detail={ detail }
                isValidForm={ isValidForm }
                handleValidateForm={ this.handleValidateForm }
                cartItems={ cartItems }
                cartAmount={ cartAmount }
              />
            ) }
          />
          <Route
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              cartItems={ cartItems }
            />) }
          />
        </Switch>
      </main>
    );
  }
}

export default App;
