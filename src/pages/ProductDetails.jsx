import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import carrinho from '../images/carrinho.png';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      description: '',
      stars: 0,
      savedRatings: [],
    };
  }

  componentDidMount() {
    this.getLocalstrorageRatings();
  }

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

  ratingChanged = (newRating) => {
    // console.log(newRating);
    this.setState({ stars: newRating });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
    console.log('value: ', value, 'name: ', name);
  }

  saveRating = () => {
    const { email, description, stars } = this.state;
    const objRating = { email, description, stars };
    const localStorageSaved = JSON.parse(localStorage.getItem('rating'));
    const items = localStorageSaved === null ? [] : localStorageSaved;

    localStorage.setItem('rating', JSON.stringify([...items, objRating]));
    this.setState({ email: '', description: '', stars: 0 });
    // this.getLocalstrorageRatings();
  }

  getLocalstrorageRatings = () => {
    const savedRatings = JSON.parse(localStorage.getItem('rating'));
    // console.log('get', typeof savedRatings[0]);

    this.setState({ savedRatings });
  }

  render() {
    const { location: { state: { thumbnail, title, price } } } = this.props;
    const { email, description, stars, savedRatings } = this.state;

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
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
          />

          <ReactStars
            count={ 5 }
            onChange={ this.ratingChanged }
            size={ 24 }
            activeColor="#ffd700"
            value={ stars }
          />

          <textarea
            name="description"
            placeholder="Mensagem (Opcional)"
            value={ description }
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            onClick={ this.saveRating }
            disabled={ email.length === 0 || stars === 0 }
          >
            Enviar
          </button>
        </form>

        {savedRatings
          && savedRatings.map((rating, index) => (
            <div key={ `${rating.email}${index}` }>
              {console.log(typeof rating)}
              <p>{ rating.email }</p>
              <ReactStars
                count={ 5 }
                // onChange={ this.ratingChanged }
                size={ 24 }
                activeColor="#ffd700"
                value={ rating.stars }
              />
              <p>{ rating.description }</p>
            </div>
          ))}
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.object,
}.isRequired;

export default ProductDetails;
