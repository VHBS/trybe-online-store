import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardProducts from '../components/CardProducts';
import Categorias from '../components/Categorias';
import carrinho from '../images/carrinho.png';
import { getProductsFromCategoryAndQuery, getProductsFromQuery } from '../services/api';

class TelaPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      pesquisa: '',
      products: [],
    });
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

  addToCart = async ({ thumbnail, title, price, id, attributes }) => {
    // const { thumbnail, title, price, id, attributes } = this.props;
    const objProducts = { thumbnail, title, price, id, attributes, quantity: 1 };
    const itemsLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    const emptyLocalStorage = [];

    const updateLS = (itemsLocalStorage === null) ? emptyLocalStorage
      : itemsLocalStorage;

    const test = updateLS.some((item, index) => {
      if (item.id === objProducts.id) {
        updateLS[index].quantity += 1;

        localStorage.setItem('cartItems',
          JSON.stringify([...updateLS]));
        return true;
      }

      return false;
    });

    if (!test) {
      localStorage.setItem('cartItems',
        JSON.stringify([...updateLS, objProducts]));
      return false;
    }
  }

  render() {
    const { pesquisa, products } = this.state;

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
        <Link data-testid="shopping-cart-button" to="/Cart">
          <img className="logo-cart" src={ carrinho } alt="" />
        </Link>
        <Categorias radioSelected={ this.searchProductByCategoryAndQuery } />

        {products.map((produto, index) => (
          <div key={ produto.title + index }>
            <Link
              data-testid="product-detail-link"
              to={ { pathname: 'product-details', state: produto } }
            >
              {/* <CardProducts key={ produto.title + index } { ... produto } /> */}
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
