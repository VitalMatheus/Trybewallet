export const ADD_LOGIN_TO_STORE = 'ADD_LOGIN_TO_STORE';
export const ADD_CURRENCIES_TO_STORE = 'ADD_CURRENCIES_TO_STORE';

export const setState = (email) => ({
  type: ADD_LOGIN_TO_STORE,
  payload: email,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES_TO_STORE,
  payload: currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const dataKeys = Object.keys(data);
    const result = dataKeys.filter((key) => key !== 'USDT');
    dispatch(addCurrencies(result));
  };
}
