import * as types from "./actionTypes";
const initialState = {
  loading: false,
  currentAdmin: null,
  error: null,
  requestsList: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAdmin: action.payload,
      };

    case types.SIGNIN_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case types.LOGOUT_END:
      return {
        ...state,
        loading: false,
        currentAdmin: action.payload,
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        requestsList: [action.payload],
      };
    case types.SIGNUP_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
