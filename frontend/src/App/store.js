import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { postsReducer, userReducer } from "../reducers";

export default (state = {}) => {
  const devToolsExtension = global.__REDUX_DEVTOOLS_EXTENSION__ ? global.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

  return createStore(
    combineReducers({
      posts: postsReducer,
      user: userReducer,
    }),
    state,
    compose(
      applyMiddleware(thunk),
      devToolsExtension
    )
  );
};
