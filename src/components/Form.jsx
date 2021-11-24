import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      adress: '',
      buttonClicked: false,
      formChecked: false,
    };
  }

    handleChange = ({ target: { name, value } }) => {
      this.setState({
        [name]: value,
      });
    }

    validateForm = () => {
      this.setState({ buttonClicked: true });
      const {
        name, email, cpf, phone, cep, adress,
      } = this.state;

      if (name && email && cpf && phone && cep && adress) {
        this.setState({ formChecked: true });
      }
    }

    render() {
      const {
        name,
        email,
        cpf,
        phone,
        cep,
        adress,
        buttonClicked,
        formChecked,
      } = this.state;

      return (
        <div>
          <form>
            <h2>Informações do comprador</h2>
            <input
              className={ !name && buttonClicked ? 'error' : '' }
              placeholder="Nome Completo"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
            />
            <input
              className={ !email && buttonClicked ? 'error' : '' }
              placeholder="E-Mail"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="checkout-email"
            />
            <input
              className={ !cpf && buttonClicked ? 'error' : '' }
              placeholder="CPF"
              type="text"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
              data-testid="checkout-cpf"
            />
            <input
              className={ !phone && buttonClicked ? 'error' : '' }
              placeholder="Telefone"
              type="text"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
              data-testid="checkout-phone"
            />
            <input
              className={ !cep && buttonClicked ? 'error' : '' }
              placeholder="Cep"
              type="text"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
              data-testid="checkout-cep"
            />
            <input
              className={ !adress && buttonClicked ? 'error' : '' }
              placeholder="Endereço"
              type="text"
              name="adress"
              value={ adress }
              onChange={ this.handleChange }
              data-testid="checkout-address"
            />
            <button type="button" onClick={ this.validateForm }> Comprar </button>
          </form>

          {formChecked && <Redirect to="/" />}
        </div>
      );
    }
}
