import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Products extends Component {
  render() {
    const { emptyList, prodList, handleAddToCart } = this.props;
    return (
      <div>
        { emptyList
          ? 'Nenhum produto foi encontrado'
          : (
            <ul>
              { prodList.map((product) => (
                <li
                  key={ product.id }
                  data-testid="product"
                >
                  <Link
                    to={ `/products/${product.id}` }
                    data-testid="product-detail-link"
                  >
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>{ product.title }</p>
                    <p>{ product.price }</p>
                  </Link>
                  <button
                    name={ product.id }
                    onClick={ handleAddToCart }
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao carrinho
                  </button>
                </li>
              )) }
            </ul>
          )}
      </div>
    );
  }
}

Products.propTypes = {
  emptyList: PropTypes.bool.isRequired,
  prodList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default Products;
