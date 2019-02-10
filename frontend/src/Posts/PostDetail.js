import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// state
import { connect } from "react-redux";

// App components
import Post from "./Post";
import { CommentSection } from "../Comments";

// Utils
import { isEmpty } from "../utils/object";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      isFavorite: null,
    };

    this.postId = props.match.params.id;
  };

  componentDidMount() {
    const { postId } = this;
    if (!postId) {
      return null;
    }

    axios.get(`/api_posts/get-post/${postId}`)
    .then(({ data }) => this.setState({
      post: data.post,
      isFavorite: data.is_favorite,
    }));
  };

  changeFavorite = () => {
    const { id } = this.state.post;

    axios.post(`/api_posts/change-favorite/${id}`)
    .then(() => this.setState({ isFavorite: !this.state.isFavorite }));
  };

  render() {
    const { post, isFavorite } = this.state;

    if (!post) {
      return null;
    }

    const { user } = this.props;
    const isLoggedIn = !isEmpty(user);

    return (
      <div>
        <Post
          post={post}
          isFavorite={isFavorite}
          isLoggedIn={isLoggedIn}
          full
          changeFavorite={this.changeFavorite}
        />
        <CommentSection
          comments={post.comments}
          isLoggedIn={isLoggedIn}
          postId={post.id}
          user={user}
        />
      </div>
    );
  };
};

PostDetail.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PostDetail);
