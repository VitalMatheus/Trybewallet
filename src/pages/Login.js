import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      emailValidation: false,
      passwordValidation: false,
    };
  }

  validatePassword = ({ target }) => {
    const min = 6;
    if (target.value.length >= min) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
    }
  }

  validateEmail = ({ target: { value } }) => {
    this.setState({
      email: value,
    });
    // https://www.w3resource.com/javascript/form/email-validation.php
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      .test(value)) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { obtainEmail, history } = this.props;
    const { email } = this.state;
    obtainEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, emailValidation, passwordValidation } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            id="email-input"
            value={ email }
            placeholder="Email"
            onChange={ this.validateEmail }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="text"
            id="password-input"
            placeholder="Senha"
            onChange={ this.validatePassword }
            data-testid="password-input"
          />
        </label>
        <button
          type="submit"
          disabled={ !emailValidation || !passwordValidation }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  obtainEmail: (email) => dispatch(setState(email)),
});

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  obtainEmail: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(Login);
