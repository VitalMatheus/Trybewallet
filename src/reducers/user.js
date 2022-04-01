const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case 'ADD_LOGIN_TO_STORE':
    return ({
      email: action.payload,
    });
  default:
    return state;
  }
}

export default user;
