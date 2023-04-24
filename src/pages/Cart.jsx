import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Cart extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('cart-items')),
  };

  render() {
    const { cartItems } = this.state;
    const isCartEmpty = cartItems === null || !cartItems.length;

    return (
      <section className="cart-page">
        <Link to="/">Página Inicial</Link>

        {isCartEmpty ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
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

      </section>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default Cart;
