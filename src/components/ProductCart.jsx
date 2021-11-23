import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnSub: false,
    };
  }

  componentDidMount() {
    const { calcValorTotalCart, price, quantity, renderCart } = this.props;
    calcValorTotalCart(price * quantity);
    renderCart();

    this.initialQuantity();
  }

  initialQuantity = () => {
    const { quantity } = this.props;
    if (quantity === 1) this.setState({ btnSub: true });
  }

  changeQuantity = (isSum) => {
    const { calcValorTotalCart, price, id, getLocalstorage, renderCart } = this.props;
    const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));

    if (isSum === true) {
      itemsLocalStorage.forEach((item, index) => {
        if (item.id === id) {
          itemsLocalStorage[index].quantity += 1;

          localStorage.setItem('cartItems',
            JSON.stringify([...itemsLocalStorage]));

          getLocalstorage();

          this.setState({ btnSub: false });
          calcValorTotalCart(price);
        }
      });
    } else {
      itemsLocalStorage.forEach((item, index) => {
        if (item.id === id) {
          itemsLocalStorage[index].quantity -= 1;

          localStorage.setItem('cartItems',
            JSON.stringify([...itemsLocalStorage]));

          getLocalstorage();

          if (itemsLocalStorage[index].quantity === 1) this.setState({ btnSub: true });
          calcValorTotalCart(-price);
        }
      });
    }
    renderCart();
  }

  deleteItem = () => {
    const { id, updateCart, renderCart } = this.props;
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const itens = cartItems.filter((item) => item.id !== id);

    if (itens.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(itens));
    } else {
      localStorage.removeItem('cartItems');
    }

    updateCart();

    const { calcValorTotalCart, price, quantity } = this.props;
    const total = quantity * price;
    calcValorTotalCart(-total);
    renderCart();
  }

  render() {
    const { thumbnail, title, price, quantity } = this.props;
    const { btnSub } = this.state;

    return (
      <div data-testid="product">
        <h4 data-testid="shopping-cart-product-name">{title}</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>

        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => this.changeQuantity(false) }
          disabled={ btnSub }
        >
          -
        </button>

        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>

        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => this.changeQuantity(true) }
        >
          +
        </button>

        <button type="button" onClick={ this.deleteItem }>X</button>
      </div>
    );
  }
}

ProductCart.propTypes = {
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
}.isRequired;
