import { createStore } from "redux";

import { compose } from "redux";
import reducer from "./Reducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;
if (process.env.NODE_ENV === "development") {
  store = createStore(reducer, composeEnhancers());
} else store = createStore(reducer);

export default store;
