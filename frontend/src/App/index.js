import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import AppBar from './AppBar';

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

    return (
      <div>
        <AppBar title='Posts' />
        {
          posts.length > 0 ? (
            posts.map((p) => (
              <div key={p.headline}>
                <h3>{p.headline} ({p.subject.name})</h3>
                <h5>By {p.author.name} on {new Date(p.created_on).toLocaleString()}</h5>
                <p>{p.text}</p>
              </div>
            ))
          ) : (
            <p>No posts are available</p>
          )
        }
      </div>
    );
  };
};
