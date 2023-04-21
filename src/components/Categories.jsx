import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Categories extends Component {
  render() {
    const { categories, handleSetCategory } = this.props;
    return (
      <div className="categories-container">
        <ul className="categories-list">
          { categories.map((category) => (
            <li key={ category.id }>
              <label htmlFor={ category.id } data-testid="category">
                <input
                  type="radio"
                  name="categories"
                  onChange={ handleSetCategory }
                  value={ category.id }
                  id={ category.id }
                />
                {category.name}
              </label>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  handleSetCategory: PropTypes.func,
}.isRequired;

export default Categories;
