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
    const {
      handleAddToCart,
      email,
      detail,
      handleChangeForm,
      isValidForm,
      handleValidateForm,
    } = this.props;
    const { product, loading, error } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { productId } = params;
    const reviews = JSON.parse(localStorage.getItem(productId));
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

        <form>
          <h1>Formulário</h1>
          <input
            name="email"
            data-testid="product-detail-email"
            type="email"
            value={ email }
            onChange={ handleChangeForm }
          />
          <label htmlFor="1-rating">
            <input
              type="radio"
              value="1"
              data-testid="1-rating"
              name="rating"
              id="1-rating"
              onChange={ handleChangeForm }
            />
            1
          </label>
          <label htmlFor="2-rating">
            <input
              type="radio"
              value="2"
              data-testid="2-rating"
              name="rating"
              id="2-rating"
              onChange={ handleChangeForm }
            />
            2
          </label>
          <label htmlFor="3-rating">
            <input
              type="radio"
              value="3"
              data-testid="3-rating"
              name="rating"
              id="3-rating"
              onChange={ handleChangeForm }
            />
            3
          </label>
          <label htmlFor="4-rating">
            <input
              type="radio"
              value="4"
              data-testid="4-rating"
              name="rating"
              id="4-rating"
              onChange={ handleChangeForm }
            />
            4
          </label>
          <label htmlFor="5-rating">
            <input
              type="radio"
              value="5"
              data-testid="5-rating"
              name="rating"
              id="5-rating"
              onChange={ handleChangeForm }
            />
            5
          </label>

          <textarea
            data-testid="product-detail-evaluation"
            name="detail"
            value={ detail }
            onChange={ handleChangeForm }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ handleValidateForm }
            name={ product.id }
          >
            Enviar
          </button>

        </form>
        { isValidForm ? null : <p data-testid="error-msg">Campos inválidos</p> }
        <section>
          <h3>Avaliações:</h3>
          <ul>
            { reviews ? reviews.map((review) => (
              <li key={ Math.random() }>
                <p data-testid="review-card-email">{ review.email }</p>
                <p data-testid="review-card-rating">{ review.rating }</p>
                <p data-testid="review-card-evaluation">{ review.text }</p>
              </li>
            )) : '' }
          </ul>
        </section>
      </section>
    );
  }
}

ProductDetail.propTypes = {
  handleAddToCart: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
    }),
  }),
  email: PropTypes.string,
  detail: PropTypes.string,
  handleChangeForm: PropTypes.func,
  isValidForm: PropTypes.bool,
  handleValidateForm: PropTypes.func,
}.isRequired;

export default ProductDetail;
