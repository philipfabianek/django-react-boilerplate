import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import CommentForm from "./CommentForm";

const styles = theme => ({
  text: {
    fontSize: "16px",
    letterSpacing: ".5px",
    lineHeight: "155%",
    marginTop: ".6rem",
    whiteSpace: "pre-line",
  },
});

class CommentSection extends React.Component {
  state = {
    newComments: [],
  };

  onSubmit = text => {
    axios.post(`/api_posts/comment/${this.props.postId}`, { text })
    .then(({ data }) => {
      this.setState({
        newComments: [
          ...this.state.newComments,
          data.comment,
        ],
      })
    });
  };

  render() {
    const { classes, user, isLoggedIn } = this.props;
    const comments = [
      ...this.props.comments,
      ...this.state.newComments,
    ];

    const numberOfComments = comments.length;

    return (
      <div className="comments">
        <Typography variant="h5" component="h3">
          {numberOfComments} comment{numberOfComments !== 1 && "s"}
        </Typography>
        {
          numberOfComments > 0 && (
            comments.map((c, i) => (
              <Paper
                className="comment"
                elevation={1}
                key={c.author.username + i}
              >
                <Typography variant="h6" component="h3">
                  by {c.author.username}&nbsp;{c.author.username === user.username && '(you)'}
                  <span className='post__author'>
                    at {new Date(c.created_on).toLocaleString()}
                  </span>
                </Typography>
                <Typography
                  className={classes.text}
                  component="p"
                >
                  {c.text}
                </Typography>
              </Paper>
            ))
          )
        }
        {
          isLoggedIn && (
            <CommentForm onSubmit={this.onSubmit} />
          )
        }
      </div>
    );
  };
};

CommentSection.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentSection);
