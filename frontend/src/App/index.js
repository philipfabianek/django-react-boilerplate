import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import AppBar from './AppBar';
import PostsList from './PostsList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  };

  componentDidMount() {
    this.fetchPosts();
  };

  fetchPosts() {
    axios.get('/api_posts/fetch-posts')
    .then(({ data }) => this.setState({ posts: data.posts }));
  };

  render() {
    const { posts } = this.state;
    const PostsListClasses = {
      'container': 'posts-list',
      'post': 'posts-list__post',
      'button': 'posts-list__post__read-more'
    };

    return (
      <div>
        <AppBar title='Posts' />
        <PostsList posts={posts} classes={PostsListClasses} />
      </div>
    );
  };
};
