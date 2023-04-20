import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('cart-items')),
  };

  render() {
    const { cartItems } = this.state;
    const isCartEmpty = cartItems === null || cartItems.length === 0;

    return (
      <section className="cart-page">
        <p data-testid="shopping-cart-empty-message">
          {isCartEmpty ? 'Seu carrinho está vazio' : (
            <ul>
              {cartItems.map(({ id, title, thumbnail, quantity }) => (
                <li key={ id }>
                  <img src={ thumbnail } alt={ title } />
                  <p data-testid="shopping-cart-product-name">{title}</p>
                  <p data-testid="shopping-cart-product-quantity">{quantity}</p>
                </li>
              ))}
            </ul>
          )}
        </p>
      </section>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default Cart;
