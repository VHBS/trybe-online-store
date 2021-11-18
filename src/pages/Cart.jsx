import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import carrinho from '../images/carrinho.png';

export default class Cart extends Component {
  render() {
    return (
      <div>
        <h1>Cart</h1>
        <Link data-testid="shopping-cart-button" to="/Cart">
          <img className="logo-cart" src={ carrinho } alt="" />
        </Link>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );
  }
}
