import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import carrinho from '../images/carrinho.png';
import ProductCart from '../components/ProductCart';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsOnCart: [],
      valorTotalCart: 0,
    };
  }

  componentDidMount() {
    this.renderCart();
  }

  updateCart = () => {
    this.renderCart();
  }

  renderCart = () => {
    const productsAdded = JSON.parse(localStorage.getItem('cartItems'));

    this.setState({
      productsOnCart: productsAdded,
    });
  }

  calcValorTotalCart = (value) => {
    this.setState(({ valorTotalCart }) => ({ valorTotalCart: valorTotalCart + value }));
  }

  render() {
    const { productsOnCart, valorTotalCart } = this.state;
    // const { location: { state: { thumbnail, title, price, id, attributes } } } = this.props;

    return (
      <div>
        <h1>Cart</h1>
        <Link data-testid="shopping-cart-button" to="/Cart">
          <img className="logo-cart" src={ carrinho } alt="" />
        </Link>
        {productsOnCart
          ? <p>{productsOnCart.length}</p>
          : <p>0</p>}
        {!productsOnCart
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : productsOnCart.map((product) => (
            <ProductCart
              key={ product.id }
              { ...product }
              updateCart={ this.updateCart }
              calcValorTotalCart={ this.calcValorTotalCart }
              getLocalstorage={ this.renderCart }
            />))}

        <p>{ `Valor total da compra: R$ ${valorTotalCart.toFixed(2)}` }</p>
        <button type="button">Finalizar Compra</button>
      </div>
    );
  }
}
