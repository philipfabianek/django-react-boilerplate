import React from 'react';
import PropTypes from 'prop-types';

// State
import { connect } from "react-redux";

// App components
import Post from "./Post";

const PostDetail = (props) => {
  const { posts } = props;
  const { id } = props.match.params;

  if (!id) {
    return null;
  }

  const post = posts.filter((p) => p.id === id)[0];

  if (!post) {
    return null;
  }

  return (
    <Post full post={post} />
  );
};

PostDetail.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(PostDetail);
