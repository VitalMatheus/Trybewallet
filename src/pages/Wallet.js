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
    return (
      <Header />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = ({
  getCurrencies: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(Wallet);
