import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// State
import { connect } from "react-redux";

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    fontSize: "16px",
    letterSpacing: ".5px",
    lineHeight: "155%",
    marginTop: "1rem",
    whiteSpace: "pre-line",
  },
});

const Post = (props) => {
  const { classes, posts } = props;
  const { id } = props.match.params;

  if (!id) {
    return null;
  }

  const post = posts.filter((p) => p.id === id)[0];

  if (!post) {
    return null;
  }

  return (
    <div>
      <Paper className='post' elevation={1}>
        <div className='post__content'>
          <Typography variant="h5" component="h3">
            {post.headline}
          </Typography>
          <Typography
            component="p"
            className={classes.text}
          >
            {post.text}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

Post.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
