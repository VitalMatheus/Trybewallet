import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';
import Header from './Header';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { getState } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              name=""
              id="value-input"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              name="currency"
              id="currency-input"
            >
              { getState
                .map((currency) => (<option key={ currency }>{ currency }</option>)) }
            </select>
          </label>
          <label htmlFor="payment">
            <select
              id="payment"
              data-testid="method-input"
            >
              <option value="money">Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select id="tag" data-testid="tag-input">
              <option value="feeding">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              type="text"
              name=""
              id="description-input"
              data-testid="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  getState: state.wallet.currencies,
});

Wallet.propTypes = ({
  getCurrencies: PropTypes.func.isRequired,
  getState: PropTypes.arrayOf(String).isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
