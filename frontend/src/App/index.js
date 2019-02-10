import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// State
import { Provider as ReduxProvider } from "react-redux";
import initStore from "./store";
import { startSetUser } from "../actions/user";
import { startSetPosts } from "../actions/posts";

// Post routes
import AppBar from './AppBar';
import { Login, Signup, ConfirmationFailed } from '../authentication';
import { PostsList, PostDetail } from '../Posts';

// Initialize
import "./init";

// Store and initial fetch
const store = initStore();
store.dispatch(startSetUser());
store.dispatch(startSetPosts());

export default () => {
  return (
    <ReduxProvider store={store}>
      <Router>
        <div>
          <AppBar title='Posts' />
          <Route path="/recent" component={PostsList} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/confirmation-failed" component={ConfirmationFailed} />
          <Route path="/post/:id" component={PostDetail} />
        </div>
      </Router>
    </ReduxProvider>
  );
};
