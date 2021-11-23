import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardProducts from '../components/CardProducts';
import Categorias from '../components/Categorias';
import { getProductsFromCategoryAndQuery, getProductsFromQuery } from '../services/api';
import CartCounter from '../components/CartCounter';

class TelaPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      pesquisa: '',
      products: [],
      productsOnCart: 0,
    });
  }

  componentDidMount() {
    this.renderCart();
  }

  onInputText = ({ target: { value } }) => {
    this.setState({
      pesquisa: value,
    });
  }

  searchQuery = async () => {
    const { pesquisa } = this.state;
    const resultado = await getProductsFromQuery(pesquisa);
    this.setState({
      products: resultado,
    });
  }

  searchProductByCategoryAndQuery = async ({ target: { id } }) => {
    const { pesquisa } = this.state;
    const resultado = await getProductsFromCategoryAndQuery(id, pesquisa);

    this.setState({
      products: resultado.results,
    });
  }

  addToCart = async ({ thumbnail, title, price, id, attributes,
    available_quantity: availableQuantity }) => {
    const objProducts = { thumbnail,
      title,
      price,
      id,
      attributes,
      quantity: 1,
      availableQuantity,
    };
    const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    const emptyLocalStorage = [];

    const updateLS = (itemsLocalStorage === null) ? emptyLocalStorage
      : itemsLocalStorage;

    const test = updateLS.some((item, index) => {
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

    if (!test) {
      localStorage.setItem('cartItems',
        JSON.stringify([...updateLS, objProducts]));
      this.renderCart();
      return false;
    }
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
    const { pesquisa, products, productsOnCart } = this.state;

    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="pesquisa"
          value={ pesquisa }
          onChange={ this.onInputText }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.searchQuery }
        >
          Pesquisar
        </button>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CartCounter productsOnCart={ productsOnCart } />
        <Categorias radioSelected={ this.searchProductByCategoryAndQuery } />

        {products.map((produto, index) => (
          <div key={ produto.title + index }>
            <Link
              data-testid="product-detail-link"
              to={ { pathname: 'product-details', state: produto } }
            >
              <CardProducts { ... produto } />
            </Link>
            <button
              type="button"
              onClick={ () => this.addToCart(produto) }
              data-testid="product-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default TelaPrincipal;
