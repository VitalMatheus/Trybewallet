import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { recoveredEmail, expenses } = this.props;
    const total = expenses.length < 1 ? 0 : expenses
      .map((index) => (index.exchangeRates[index.currency].ask) * Number(index.value))
      .reduce((acc, curr) => acc + curr)
      .toFixed(2);

    return (
      <div className="header-container">
        <div>
          <h3>TRYBEWALLET</h3>
        </div>
        <div className="header-infos">
          <h4 data-testid="email-field">{ `Usuário: ${recoveredEmail}` }</h4>
          <h4 data-testid="total-field">{ total }</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recoveredEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = ({
  recoveredEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
});

export default connect(mapStateToProps, null)(Header);
