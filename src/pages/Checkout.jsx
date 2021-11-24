import React, { Component } from 'react';
import Form from '../components/Form';

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsOnCart: [],
      totalAmount: 0,
    };
  }

  componentDidMount() {
    this.renderCart();
    this.totalAmount();
  }

  totalAmount = () => {
    const productsAdded = JSON.parse(localStorage.getItem('cartItems'));
    const totalAmount = productsAdded
      .reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

    this.setState({
      totalAmount,
    });
  }

  renderCart = () => {
    const productsAdded = JSON.parse(localStorage.getItem('cartItems'));

    this.setState({
      productsOnCart: productsAdded,
    });
  }

  render() {
    const { productsOnCart, totalAmount } = this.state;
    return (
      <div>
        <h2>Revise seus produtos</h2>
        {
          (productsOnCart) ? productsOnCart.map(({ title, thumbnail, price }, index) => (
            <div key={ index }>
              <img src={ thumbnail } alt={ title } />
              <p>
                {' '}
                {title}
              </p>
              <p>{price}</p>
            </div>
          )) : null
        }
        <p>
          {' '}
          Valor Total:
          {' '}
          {totalAmount}
        </p>
        <Form />
      </div>
    );
  }
}
