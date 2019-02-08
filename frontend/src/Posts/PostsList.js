import React from 'react';
import PropTypes from 'prop-types';

// State
import { connect } from "react-redux";

// App components
import Post from "./Post";

const PostsList = (props) => {
  const { posts } = props;

  return (
    <div className='posts-list'>
      {
        posts.map((p, i) => (
          <div key={p.headline + i}>
            <Post full={false} post={p} />
          </div>
        ))
      }
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(PostsList);
