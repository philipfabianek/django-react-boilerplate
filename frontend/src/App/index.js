import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// State
import { Provider } from "react-redux";
import initStore from "./store";
import { startSetPosts } from "../actions/posts";

// Post routes
import AppBar from './AppBar';
import { PostsList, PostDetail } from '../Posts';

// Store and initial fetch
const store = initStore();
store.dispatch(startSetPosts());

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <AppBar title='Posts' />
        <Route path="/" exact component={PostsList} />
        <Route path="/post/:id" component={PostDetail} />
      </div>
    </Router>
  </Provider>
);
