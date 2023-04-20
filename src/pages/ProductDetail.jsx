import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductDetail extends Component {
  state = {
    loading: true,
    product: null,
    error: null,
  };

  async componentDidMount() {
    const { productId } = this.props.match.params;
    const url = `https://api.mercadolibre.com/items/${productId}`;

    try {
      const response = await fetch(url);
      const product = await response.json();
      this.setState({ product, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  render() {
    const { addToCart } = this.props;
    const { product, loading, error } = this.state;

    if (loading) {
      return (
        <div>
          Carregando...
        </div>
      );
    }

    if (error) {
      return (
        <div>
          Erro ao carregar produto:
          { error.message }
        </div>
      );
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
  addToCart: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
