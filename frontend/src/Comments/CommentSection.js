import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  // Incoming
});

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  };

  componentDidMount() {
    this.fetchComments();
  };

  fetchComments() {
    axios.get(`/api_posts/fetch-comments/${this.props.postId}`)
    .then(({ data }) => this.setState({ comments: data.comments }));
  };

  render() {
    const { classes } = this.props;
    const { comments } = this.state;

    return (
      <div>
        {
          comments.map((c, i) => {
            console.log("comment:", c);
            return <div></div>
          })
        }
      </div>
    );
  };
};

CommentSection.propTypes = {
  classes: PropTypes.object,
  postId: PropTypes.string.isRequired,
};

export default withStyles(styles)(CommentSection);
