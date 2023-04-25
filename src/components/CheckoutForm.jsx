import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CheckoutForm extends Component {
  render() {
    const { states,
      handleChangeCheckoutForm,
      handleClickVerifyCheckoutForm } = this.props;
    const { checkoutFullname,
      checkoutEmail,
      checkoutCPF,
      checkoutPhone,
      checkoutCEP,
      checkoutAddress } = states;
    return (
      <form>
        <label htmlFor="checkoutFullname">
          Nome Completo:
          <input
            type="text"
            data-testid="checkout-fullname"
            id="checkoutFullname"
            name="checkoutFullname"
            value={ checkoutFullname }
            onChange={ handleChangeCheckoutForm }
          />
        </label>
        <label htmlFor="checkoutEmail">
          Email:
          <input
            type="email"
            data-testid="checkout-email"
            id="checkoutEmail"
            name="checkoutEmail"
            value={ checkoutEmail }
            onChange={ handleChangeCheckoutForm }
          />
        </label>
        <label htmlFor="checkoutCPF">
          CPF:
          <input
            type="text"
            data-testid="checkout-cpf"
            id="checkoutCPF"
            name="checkoutCPF"
            value={ checkoutCPF }
            onChange={ handleChangeCheckoutForm }
          />
        </label>
        <label htmlFor="checkoutPhone">
          Telefone:
          <input
            type="text"
            data-testid="checkout-phone"
            id="checkoutPhone"
            name="checkoutPhone"
            value={ checkoutPhone }
            onChange={ handleChangeCheckoutForm }
          />
        </label>
        <label htmlFor="checkoutCEP">
          CEP:
          <input
            type="text"
            data-testid="checkout-cep"
            id="checkoutCEP"
            name="checkoutCEP"
            value={ checkoutCEP }
            onChange={ handleChangeCheckoutForm }
          />
        </label>
        <label htmlFor="checkoutAddress">
          Endereço:
          <input
            type="text"
            data-testid="checkout-address"
            id="checkoutAddress"
            name="checkoutAddress"
            value={ checkoutAddress }
            onChange={ handleChangeCheckoutForm }
          />
        </label>
        <label htmlFor="ticket">
          <input
            data-testid="ticket-payment"
            type="radio"
            id="ticket"
            name="payment"
            value="ticket"
            onChange={ handleChangeCheckoutForm }
          />
          Boleto
        </label>
        <label htmlFor="visa">
          <input
            data-testid="visa-payment"
            type="radio"
            id="visa"
            name="payment"
            value="visa"
            onChange={ handleChangeCheckoutForm }
          />
          Visa
        </label>
        <label htmlFor="master">
          <input
            data-testid="master-payment"
            type="radio"
            id="master"
            name="payment"
            value="master"
            onChange={ handleChangeCheckoutForm }
          />
          MasterCard
        </label>
        <label htmlFor="elo">
          <input
            data-testid="elo-payment"
            type="radio"
            id="elo"
            name="payment"
            value="elo"
            onChange={ handleChangeCheckoutForm }
          />
          Elo
        </label>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ handleClickVerifyCheckoutForm }
        >
          Enviar
        </button>
      </form>
    );
  }
}

CheckoutForm.propTypes = {
  handleChangeCheckoutForm: PropTypes.func,
  handleClickVerifyCheckoutForm: PropTypes.func,
  states: PropTypes.shape({
    checkoutAddress: PropTypes.string,
    checkoutCEP: PropTypes.string,
    checkoutCPF: PropTypes.string,
    checkoutEmail: PropTypes.string,
    checkoutFullname: PropTypes.string,
    checkoutPhone: PropTypes.string,
  }),
}.isRequired;
