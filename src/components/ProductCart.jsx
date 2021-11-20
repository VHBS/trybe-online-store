import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantidade: 1,
    };
  }

  componentDidMount() {
    const { calcValorTotalCart, price } = this.props;
    calcValorTotalCart(price);
  }

  changeQuantity = (isSum) => {
    const { calcValorTotalCart, price } = this.props;

    if (isSum === true) {
      this.setState(({ quantidade }) => ({ quantidade: quantidade + 1 }),
        () => {
          calcValorTotalCart(price);
        });
    } else {
      this.setState(({ quantidade }) => (
        (quantidade > 1) ? { quantidade: quantidade - 1 }
          : { quantidade }
      ), () => {
        calcValorTotalCart(-price);
      });
    }
  }

  deleteItem = () => {
    // localStorage.removeItem('cartItems');
    const { id, updateCart } = this.props;
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const itens = cartItems.filter((item) => item.id !== id);

    if (itens.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(itens));
    } else {
      localStorage.removeItem('cartItems');
    }

    updateCart();

    const { calcValorTotalCart, price } = this.props;
    const { quantidade } = this.state;
    const total = quantidade * price;
    calcValorTotalCart(-total);
  }

  render() {
    const { thumbnail, title, price } = this.props;
    const { quantidade } = this.state;

    return (
      <div data-testid="product">
        <h4 data-testid="shopping-cart-product-name">{title}</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>

        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => this.changeQuantity(false) }
        >
          -
        </button>

        <p>{ quantidade }</p>

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
