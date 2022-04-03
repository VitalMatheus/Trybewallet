const initialState = {
  currencies: [],
  expenses: [],
  buttonExpenses: true,
  editId: 0,
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
  case 'EDIT_BUTTON':
    return {
      ...state,
      buttonExpenses: false,
      editId: action.payload,
    };
  case 'UPDATE_STATE':
    return {
      ...state,
      buttonExpenses: true,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
