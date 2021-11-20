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

  // addToCart = async () => {
  //   const { productsOnCart: { thumbnail, title, price, id, attributes } } = this.state;
  //   const objProducts = { thumbnail, title, price, id, attributes };
  //   const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
  //   const emptyLocalStorage = [];

  //   const test = (itemsLocalStorage === null) ? emptyLocalStorage
  //     : itemsLocalStorage;

  //   localStorage.setItem('cartItems',
  //     JSON.stringify([...test, objProducts]));
  // }

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
          ? <p data-testid="shopping-cart-product-quantity">{productsOnCart.length}</p>
          : <p data-testid="shopping-cart-product-quantity">0</p>}
        {!productsOnCart
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : productsOnCart.map((product) => (
            <ProductCart
              key={ product.id }
              { ...product }
              updateCart={ this.updateCart }
              calcValorTotalCart={ this.calcValorTotalCart }
            />))}

        {/* <button
          type="button"
          onClick={ () => this.addToCart() }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button> */}
        <p>{ `Valor total da compra: R$ ${valorTotalCart.toFixed(2)}` }</p>
        <button type="button">Finalizar Compra</button>
      </div>
    );
  }
}
