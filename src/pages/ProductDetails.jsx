import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import carrinho from '../images/carrinho.png';

class ProductDetails extends Component {
  render() {
    const { location: { state: { thumbnail, title, price } } } = this.props;

    return (
      <>
        <header>
          <Link data-testid="shopping-cart-button" to="/Cart">
            <img className="logo-cart" src={ carrinho } alt="" />
          </Link>
        </header>
        <div className="card-product-details">
          <h4 data-testid="product-detail-name">{title}</h4>
          <p>{ price }</p>
          <img src={ thumbnail } alt={ title } />
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.object,
}.isRequired;

export default ProductDetails;
