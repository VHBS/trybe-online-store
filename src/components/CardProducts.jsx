import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardProducts extends Component {
  render() {
    const { thumbnail, title, price } = this.props;
    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
      </div>
    );
  }
}

CardProducts.propTypes = {
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
}.isRequired;
