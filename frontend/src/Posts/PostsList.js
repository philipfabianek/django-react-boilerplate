import React from 'react';
import PropTypes from 'prop-types';

// State
import { compose } from "redux";
import { connect } from "react-redux";

// utils
import { withAxios } from "../utils/axios";

// App components
import Post from "./Post";

class PostsList extends React.Component {
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

PostsList.propTypes = {
  axios: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default compose(
  connect(mapStateToProps),
  withAxios,
)(PostsList);
