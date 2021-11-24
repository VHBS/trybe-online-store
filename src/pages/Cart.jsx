import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCart';
import CartCounter from '../components/CartCounter';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsOnCart: [],
      valorTotalCart: 0,
      productsOnCart: 0,
    };
  }

  componentDidMount() {
    this.renderCartProducts();
    this.renderCart();
  }

  updateCart = () => {
    this.renderCartProducts();
    this.renderCart();
  }

  renderCartProducts = () => {
    const productsAdded = JSON.parse(localStorage.getItem('cartItems'));

    this.setState({
      itemsOnCart: productsAdded,
    });
  }

  renderCart = () => {
    const productsAdded = JSON.parse(localStorage.getItem('cartItems'));
    if (productsAdded) {
      const cartCounter = productsAdded
        .reduce((acc, curr) => acc + curr.quantity, 0);
      this.setState({
        productsOnCart: cartCounter,
      });
    } else {
      this.setState({
        productsOnCart: 0,
      });
    }
  }

  calcValorTotalCart = (value) => {
    this.setState(({ valorTotalCart }) => ({ valorTotalCart: valorTotalCart + value }));
  }

  render() {
    const { itemsOnCart, valorTotalCart, productsOnCart } = this.state;

    return (
      <div>
        <h1>Cart</h1>
        <CartCounter productsOnCart={ productsOnCart } />
        {!itemsOnCart
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : itemsOnCart.map((product) => (
            <ProductCart
              key={ product.id }
              { ...product }
              updateCart={ this.updateCart }
              calcValorTotalCart={ this.calcValorTotalCart }
              getLocalstorage={ this.renderCartProducts }
              renderCart={ this.renderCart }
            />))}

        <p>{ `Valor total da compra: R$ ${valorTotalCart.toFixed(2)}` }</p>
        <Link to="Checkout">
          <button data-testid="checkout-products" type="button">Finalizar Compra</button>
        </Link>
      </div>
    );
  }
}
