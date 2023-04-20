import React, { Component } from 'react';

class ProductDetail extends Component {
  render() {
    const { product } = this.props;

    if (!product) {
      return <div>Produto não encontrado</div>;
    }
    
    return (
      <section className="product-detail-page">
        <img 
          src={ product.thumbnail } 
          alt={ product.title } 
          data-testid="product-detail-image" 
        />
        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <p data-testid="product-detail-price">{ product.price }</p>
        <button 
          onClick={() => this.props.addToCart(product)} 
          data-testid="add-to-cart-button"
        >
          Adicionar ao carrinho
        </button>
      </section>
    );
  }
}

export default ProductDetail;
