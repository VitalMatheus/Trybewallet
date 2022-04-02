import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, setFormInfos } from '../actions';
import Header from './Header';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleFetch = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { setForm, expenses } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    const gambiarra = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data };

    setForm(gambiarra);
  }

  handleClick = async (e) => {
    e.preventDefault();

    await this.handleFetch();

    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { getState } = this.props;
    return (
      <div>
        <Header />
        <form className="wallet-container">
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              value={ value }
              id="value"
              placeholder="0"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              value={ currency }
              id="currency"
              onChange={ this.handleChange }
            >
              { getState
                .map((curr) => (<option key={ curr }>{ curr }</option>)) }
            </select>
          </label>
          <label htmlFor="method">
            <select
              id="method"
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              name="tag"
              value={ tag }
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              value={ description }
              id="description"
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  setForm: (payload) => dispatch(setFormInfos(payload)),
});

const mapStateToProps = (state) => ({
  getState: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = ({
  getCurrencies: PropTypes.func.isRequired,
  getState: PropTypes.arrayOf(String).isRequired,
  setForm: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
