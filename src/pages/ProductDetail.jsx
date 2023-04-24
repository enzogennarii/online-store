import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductById } from '../services/api';

class ProductDetail extends Component {
  state = {
    loading: true,
    product: null,
    error: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;

    try {
      const product = await getProductById(productId);
      this.setState({ product, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  render() {
    const { handleAddToCart } = this.props;
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
        <Link to="/">Página Inicial</Link>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button>Carrinho</button>
        </Link>

        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <p data-testid="product-detail-price">{ product.price }</p>
        <button
          name={ product.id }
          onClick={ handleAddToCart }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </section>
    );
  }
}

ProductDetail.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
