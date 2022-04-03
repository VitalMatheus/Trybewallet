import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, setFormInfos, updateState } from '../actions';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

const ALIMENTAÇÂO = 'Alimentação';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÂO,
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

  handleClick = async () => {
    await this.handleFetch();

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÂO,
    });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  handleEdit = (e) => {
    e.preventDefault();
    const { expenses, editId, update } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const array = [...expenses];
    const changed = array[Number(editId)];

    changed.value = value;
    changed.description = description;
    changed.currency = currency;
    changed.method = method;
    changed.tag = tag;

    update(array);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÂO,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { getState, buttonExpenses } = this.props;
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
              data-testid="currency-input"
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
            type="button"
            onClick={ buttonExpenses ? this.handleClick : this.handleEdit }
          >
            { buttonExpenses ? 'Adicionar despesa' : 'Editar despesa' }
          </button>
        </form>
        <ExpensesTable />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  setForm: (payload) => dispatch(setFormInfos(payload)),
  update: (payload) => dispatch(updateState(payload)),
});

const mapStateToProps = (state) => ({
  getState: state.wallet.currencies,
  expenses: state.wallet.expenses,
  buttonExpenses: state.wallet.buttonExpenses,
  editId: state.wallet.editId,
});

Wallet.propTypes = ({
  getCurrencies: PropTypes.func.isRequired,
  getState: PropTypes.arrayOf(String).isRequired,
  setForm: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  buttonExpenses: PropTypes.bool.isRequired,
  editId: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
