import PropTypes from 'prop-types';
import React from 'react';
import { FaWallet } from 'react-icons/fa';
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
        <div className="header-title">
          <FaWallet size={ 30 } />
          <h4>TRYBEWALLET</h4>
        </div>
        <div className="header-infos">
          <p data-testid="email-field">{`Olá ${recoveredEmail.split('@')[0]}`}</p>
          {/* <p data-testid="header-currency-field">Moeda: BRL</p> */}
          <p data-testid="total-field">
            <strong>
              { `Total: ${total} BRL` }
            </strong>
          </p>
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
