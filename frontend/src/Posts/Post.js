import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Material-UI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  text: {
    fontSize: "16px",
    letterSpacing: ".5px",
    lineHeight: "155%",
    marginTop: "1rem",
  },
  fullText: {
    marginTop: "1.6rem",
    whiteSpace: "pre-line",
  },
});

const Post = (props) => {
  const { classes, full, post } = props;

  return (
    <Paper className={`post ${full ? 'post--full' : 'post--read-more'}`} elevation={1}>
      <div className='post__content'>
        <Typography variant="h5" component="h3">
          {post.headline} <span className='post__author'>
            by {post.author.user.username} at {new Date(post.created_on).toLocaleString()}
          </span>
        </Typography>
        <Typography
          component="p"
          className={`${classes.text} ${full && classes.fullText}`}
        >
          {post.text}
        </Typography>
      </div>
      {
        !full && (
          <Link to={`/post/${post.id}`}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Read more
            </Button>
          </Link>
        )
      }
    </Paper>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  full: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
