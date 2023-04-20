import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    const isCartEmpty = cartItems.length === 0;

    return (
      <section className="cart-page">
        <p data-testid="shopping-cart-empty-message">
          {isCartEmpty ? 'Seu carrinho está vazio' : ''}
        </p>
      </section>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default Cart;
