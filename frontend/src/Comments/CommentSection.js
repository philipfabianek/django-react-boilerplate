import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// state
import { connect } from "react-redux";

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import CommentForm from "./CommentForm";

import { isEmpty } from "../utils/object";

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
  constructor(props) {
    super(props);
    this.state = {
      newComments: [],
    };
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
    const { classes, user } = this.props;
    const comments = [
      ...this.props.comments,
      ...this.state.newComments,
    ];

    const isLoggedIn = !isEmpty(user);
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
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(CommentSection));
