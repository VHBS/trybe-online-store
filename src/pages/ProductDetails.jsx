import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import carrinho from '../images/carrinho.png';

class ProductDetails extends Component {
  addToCart = async () => {
    const { location:
      { state: { thumbnail, title, price, id, attributes } } } = this.props;

    const objProducts = { thumbnail, title, price, id, attributes };
    const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    const emptyLocalStorage = [];

    const test = (itemsLocalStorage === null) ? emptyLocalStorage
      : itemsLocalStorage;

    localStorage.setItem('cartItems',
      JSON.stringify([...test, objProducts]));
  }

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
          <Link
            to={ { pathname: 'Cart' } }
          >
            <button
              type="button"
              onClick={ () => this.addToCart() }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
          </Link>
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.object,
}.isRequired;

export default ProductDetails;
