// import { combineReducers } from "redux";
import { combineReducers } from "redux";
import reducer from "./reducers";

const rootReducer = combineReducers({
  admin: reducer,
});

export default rootReducer;
