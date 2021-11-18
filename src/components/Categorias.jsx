import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Categorias extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    this.gettingCategories();
  }

  gettingCategories = async () => {
    const retorno = await getCategories();
    this.setState({
      categorias: retorno,
    });
  }

  render() {
    const { categorias } = this.state;
    return (
      <div>
        <h1>Categorias:</h1>
        {categorias.map((categoria) => (
          <label key={ categoria.id } htmlFor={ categoria.id }>
            <input
              type="radio"
              data-testid="category"
              id={ categoria.id }
              name="categorias"
            />
            { categoria.name }
            <br />
          </label>
        ))}
      </div>
    );
  }
}
