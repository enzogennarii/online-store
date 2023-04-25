import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CheckoutForm from '../components/CheckoutForm';

export default class Checkout extends Component {
  state = {
    checkoutFullname: '',
    checkoutEmail: '',
    checkoutCPF: '',
    checkoutPhone: '',
    checkoutCEP: '',
    checkoutAddress: '',
    payment: '',
    isValid: false,
  };

  handleChangeCheckoutForm = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClickVerifyCheckoutForm = () => {
    const states = this.state;
    const statesValues = Object.values(states);
    this.setState({
      isValid: statesValues.every((state) => {
        if (typeof state === 'string') {
          return state.length;
        }
        return true;
      }),
    }, this.cleanCartAndRedirect);
  };

  cleanCartAndRedirect = () => {
    const { isValid } = this.state;
    const { history } = this.props;
    if (isValid) {
      localStorage.removeItem('cart-items');
      history.push('/');
    }
  };

  render() {
    const { cartItems } = this.props;
    const { checkoutFullname,
      checkoutEmail,
      checkoutCPF,
      checkoutPhone,
      checkoutCEP,
      checkoutAddress,
      payment,
      isValid } = this.state;
    const states = { checkoutFullname,
      checkoutEmail,
      checkoutCPF,
      checkoutPhone,
      checkoutCEP,
      checkoutAddress,
      payment };
    return (
      <section className="checkout-page">
        <ul>
          {cartItems.map(({ title }) => <li key={ Math.random() }>{title}</li>)}
        </ul>
        <CheckoutForm
          handleChangeCheckoutForm={ this.handleChangeCheckoutForm }
          states={ states }
          handleClickVerifyCheckoutForm={ this.handleClickVerifyCheckoutForm }
        />
        {isValid ? '' : <p data-testid="error-msg">Campos inválidos</p>}
      </section>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})),
  history: PropTypes.shape({}),
}.isRequired;
