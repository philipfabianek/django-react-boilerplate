import React from 'react';
import PropTypes from 'prop-types';

// State
import { connect } from "react-redux";
import { startSetPosts } from "../actions/posts";

// App components
import Post from "./Post";

class RecentPosts extends React.Component {
  componentDidMount() {
    this.props.startSetPosts();
  };

  render() {
    const { posts } = this.props;

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
};

RecentPosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  startSetPosts: () => dispatch(startSetPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentPosts);
