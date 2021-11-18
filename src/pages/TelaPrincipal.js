import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardProducts from '../components/CardProducts';
import Categorias from '../components/Categorias';
import carrinho from '../images/carrinho.png';
import { getProductsFromQuery } from '../services/api';

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
        <Categorias />
        {products.map((produto, index) => (
          <CardProducts key={ produto.title + index } { ... produto } />
        ))}
      </div>
    );
  }
}

export default TelaPrincipal;
