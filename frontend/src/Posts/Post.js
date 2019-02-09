import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Material-UI
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
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
  favoriteIcon: {
    marginLeft: ".2rem",
    padding: "9px",
  },
});

const Post = (props) => {
  const { classes, full, post, isFavorite } = props;

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
        full && (
          <div className="post__make-favorite">
            <Typography
              color='primary'
              variant='subtitle2'
            >
              Make favorite
            </Typography>
            <IconButton
              color="inherit"
              className={classes.favoriteIcon}
              aria-label="Change favorite"
              onClick={props.changeFavorite}
            >
              {isFavorite ? (
                <Favorite color='primary' fontSize='small' />
              ) : (
                <FavoriteBorder color='primary' fontSize='small' />
              )}
            </IconButton>
          </div>
        )
      }
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
  isFavorite: PropTypes.bool,
  post: PropTypes.object.isRequired,
  changeFavorite: PropTypes.func,
};

export default withStyles(styles)(Post);
