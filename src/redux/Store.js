import { createStore, applyMiddleware } from "redux";
import rootReducers from "./rootReducers";
import thunk from "redux-thunk";

const middleware = [thunk];

export const store = createStore(rootReducers, applyMiddleware(...middleware));
