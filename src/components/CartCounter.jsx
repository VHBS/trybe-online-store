import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import carrinho from '../images/carrinho.png';

export default class CartCounter extends Component {
  render() {
    const { productsOnCart } = this.props;

    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/Cart">
          <img className="logo-cart" src={ carrinho } alt="" />
        </Link>
        {productsOnCart
          ? <p data-testid="shopping-cart-size">{productsOnCart}</p>
          : <p data-testid="shopping-cart-size">0</p>}
      </div>
    );
  }
}

CartCounter.propTypes = {
  productsOnCart: PropTypes.number,
}.isRequired;
