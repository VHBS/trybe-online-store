import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardProducts extends Component {
  addToCart = async () => {
    const { thumbnail, title, price, id, attributes } = this.props;
    const objProducts = { thumbnail, title, price, id, attributes };
    const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    const emptyLocalStorage = [];

    const test = (itemsLocalStorage === null) ? emptyLocalStorage
      : itemsLocalStorage;

    localStorage.setItem('cartItems',
      JSON.stringify([...test, objProducts]));
  }

  render() {
    const { thumbnail, title, price,
      shipping: { free_shipping: freeShipping } } = this.props;

    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        {freeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
      </div>
    );
  }
}

CardProducts.propTypes = {
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
}.isRequired;
