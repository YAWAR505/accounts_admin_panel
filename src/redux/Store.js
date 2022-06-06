import { createStore, applyMiddleware } from "redux";
import rootReducers from "./rootReducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = [thunk];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}
export const store = createStore(rootReducers, applyMiddleware(...middleware));
