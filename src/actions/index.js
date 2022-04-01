export const ADD_LOGIN_TO_STORE = 'ADD_LOGIN_TO_STORE';

export const setState = (email) => ({
  type: ADD_LOGIN_TO_STORE,
  payload: email,
});
