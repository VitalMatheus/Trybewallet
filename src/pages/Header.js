import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      expenses: 0,
      exchange: 'BRL',
    };
  }

  render() {
    const { expenses, exchange } = this.state;
    const { recoveredEmail } = this.props;
    return (
      <div className="header-container">
        <h4 data-testid="email-field">{ recoveredEmail }</h4>
        <h4 data-testid="total-field">{ expenses }</h4>
        <h4 data-testid="header-currency-field">{ exchange }</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recoveredEmail: state.user.email,
});

Header.propTypes = ({
  recoveredEmail: PropTypes.string.isRequired,
});

export default connect(mapStateToProps, null)(Header);
