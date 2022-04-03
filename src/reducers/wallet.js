const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'ADD_CURRENCIES_TO_STORE':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'ADD_FORM_INFOS_TO_STORE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_BUTTON':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
