import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
    };
  }

  render() {
    const { cartItems } = this.state;
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

export default Cart;
