import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// State
import { Provider as ReduxProvider } from "react-redux";
import initStore from "./store";
import { startSetPosts } from "../actions/posts";

// Utils
import { AxiosProvider } from "../utils/axios";

// Post routes
import AppBar from './AppBar';
import { PostsList, PostDetail } from '../Posts';

// Store and initial fetch
const store = initStore();
store.dispatch(startSetPosts());

export default () => {
  return (
    <AxiosProvider>
      <ReduxProvider store={store}>
        <Router>
          <div>
            <AppBar title='Posts' />
            <Route path="/" exact component={PostsList} />
            <Route path="/post/:id" component={PostDetail} />
          </div>
        </Router>
      </ReduxProvider>
    </AxiosProvider>
  );
};
