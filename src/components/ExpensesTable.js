import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { delButton, editButton } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, exclude, edit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                { (expense.exchangeRates[expense.currency]
                  .ask * expense.value).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  id={ expense.id }
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => edit(expense.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => exclude(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  exclude: (id) => dispatch(delButton(id)),
  edit: (id) => dispatch(editButton(id)),
});

ExpensesTable.propTypes = ({
  expenses: PropTypes.arrayOf(Object).isRequired,
  exclude: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
