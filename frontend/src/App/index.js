import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from './AppBar';
import { PostsList, PostDetail } from '../Posts';

export default () => (
  <Router>
    <div>
      <AppBar title='Posts' />
      <Route path="/" exact component={PostsList} />
      <Route path="/post/:id" component={PostDetail} />
    </div>
  </Router>
);
