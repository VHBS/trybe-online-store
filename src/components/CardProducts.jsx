import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardProducts extends Component {
   addToCart = async () => {
     const { thumbnail, title, price, id, attributes } = this.props;
     const objProducts = { thumbnail, title, price, id, attributes };
     const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
     const emptyLocalStorage = [];

     const test = (itemsLocalStorage === null) ? emptyLocalStorage
       : itemsLocalStorage;

     localStorage.setItem('cartItems',
       JSON.stringify([...test, objProducts]));
   }

   render() {
     const { thumbnail, title, price } = this.props;

     return (
       <div data-testid="product">
         <h4>{title}</h4>
         <img src={ thumbnail } alt={ title } />
         <p>{ price }</p>
         {/* <Link
           to={ { pathname: 'Cart',} }
         >
           
         </Link> */}
       </div>
     );
   }
}

CardProducts.propTypes = {
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
}.isRequired;
