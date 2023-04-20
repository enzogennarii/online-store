import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Products extends Component {
  render() {
    const { emptyList, prodList } = this.props;
    return (
      <div>
        { emptyList
          ? 'Nenhum produto foi encontrado'
          : (
            <ul>
              { prodList.map((p) => (
                <li
                  key={ p.id }
                  data-testid="product"
                >
                  <Link to={ `/products/${p.id}` } data-testid="product-detail-link">
                    <img src={ p.thumbnail } alt={ p.title } />
                    <p>{ p.title }</p>
                    <p>{ p.price }</p>
                  </Link>
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
};

export default Products;
