import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from '../components/Categorias';
import carrinho from '../images/carrinho.png';

class TelaPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      pesquisa: '',
    });
  }

  onInputText = ({ target: { value } }) => {
    this.setState({
      pesquisa: value,
    });
  }

  render() {
    const { pesquisa } = this.state;

    return (
      <div>
        <input
          type="text"
          name="pesquisa"
          value={ pesquisa }
          onChange={ this.onInputText }
        />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/Cart">
          <img className="logo-cart" src={ carrinho } alt="" />
        </Link>
        <Categorias />
      </div>
    );
  }
}

export default TelaPrincipal;
