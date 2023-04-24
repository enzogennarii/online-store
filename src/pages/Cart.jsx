import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Cart extends Component {
  render() {
    const { cartItems, handleRemoveProduct, handleChangeQuantity } = this.props;
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
                <button
                  data-testid="remove-product"
                  name={ id }
                  onClick={ handleRemoveProduct }
                >
                  Remover Item
                </button>
                <button
                  data-testid="product-decrease-quantity"
                  name={ id }
                  value="-"
                  onClick={ handleChangeQuantity }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">{quantity}</p>
                <button
                  data-testid="product-increase-quantity"
                  name={ id }
                  value="+"
                  onClick={ handleChangeQuantity }
                >
                  +
                </button>
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
