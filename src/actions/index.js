export const ADD_LOGIN_TO_STORE = 'ADD_LOGIN_TO_STORE';
export const ADD_CURRENCIES_TO_STORE = 'ADD_CURRENCIES_TO_STORE';
export const ADD_FORM_INFOS_TO_STORE = 'ADD_FORM_INFOS_TO_STORE';
export const DELETE_BUTTON = 'DELETE_BUTTON';

export const setState = (email) => ({
  type: ADD_LOGIN_TO_STORE,
  payload: email,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES_TO_STORE,
  payload: currencies,
});

export const setFormInfos = (expenses) => ({
  type: ADD_FORM_INFOS_TO_STORE,
  payload: expenses,
});

export const delButton = (id) => ({
  type: DELETE_BUTTON,
  payload: id,
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
