import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductDetail extends Component {
  render() {
    const { product, addToCart } = this.props;

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
          onClick={ () => addToCart(product) }
          data-testid="add-to-cart-button"
        >
          Adicionar ao carrinho
        </button>
      </section>
    );
  }
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetail;
