import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import postsReducer from "../reducers/posts";

export default (state = {}) => {
  const devToolsExtension = global.__REDUX_DEVTOOLS_EXTENSION__ ? global.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

  return createStore(
    combineReducers({
      posts: postsReducer,
    }),
    state,
    compose(
      applyMiddleware(thunk),
      devToolsExtension
    )
  );
};
