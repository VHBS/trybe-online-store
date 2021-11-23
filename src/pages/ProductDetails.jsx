import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import CartCounter from '../components/CartCounter';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      description: '',
      stars: 0,
      savedRatings: [],
      productsOnCart: 0,
    };
  }

  componentDidMount() {
    this.getLocalstrorageRatings();
    this.renderCart();
  }

  addToCart = async ({ thumbnail, title, price, id, attributes }) => {
    const objProducts = { thumbnail, title, price, id, attributes, quantity: 1 };
    const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    const emptyLocalStorage = [];

    const updateLS = (itemsLocalStorage === null) ? emptyLocalStorage
      : itemsLocalStorage;

    const checkItem = updateLS.some((item, index) => {
      if (item.id === objProducts.id) {
        updateLS[index].quantity += 1;

        localStorage.setItem('cartItems',
          JSON.stringify([...updateLS]));
        this.renderCart();
        return true;
      }
      this.renderCart();
      return false;
    });

    if (!checkItem) {
      localStorage.setItem('cartItems',
        JSON.stringify([...updateLS, objProducts]));
      this.renderCart();
      return false;
    }
  }

  ratingChanged = (newRating) => {
    this.setState({ stars: newRating });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  saveRating = () => {
    const { email, description, stars } = this.state;
    const objRating = { email, description, stars };
    const localStorageSaved = JSON.parse(localStorage.getItem('rating'));
    const items = localStorageSaved === null ? [] : localStorageSaved;

    localStorage.setItem('rating', JSON.stringify([...items, objRating]));
    this.setState({ email: '', description: '', stars: 0 });
  }

  getLocalstrorageRatings = () => {
    const savedRatings = JSON.parse(localStorage.getItem('rating'));

    this.setState({ savedRatings });
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

  render() {
    const { location:
      { state: { thumbnail, title, price, id, attributes } } } = this.props;
    const { email, description, stars, savedRatings, productsOnCart } = this.state;

    return (
      <>
        <header>
          <CartCounter productsOnCart={ productsOnCart } />
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
              onClick={ () => this.addToCart({
                thumbnail, title, price, id, attributes }) }
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
