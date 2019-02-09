import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// App components
import Post from "./Post";
import { CommentSection } from "../Comments";

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

    return (
      <div>
        <Post
          post={post}
          isFavorite={isFavorite}
          full
          changeFavorite={this.changeFavorite}
        />
        <CommentSection
          comments={post.comments}
          postId={post.id}
        />
      </div>
    );
  };
};

PostDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostDetail;
