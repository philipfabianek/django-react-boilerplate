import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    fontSize: "16px",
    letterSpacing: ".5px",
    lineHeight: "155%",
    marginTop: ".6rem",
  },
});

const CommentSection = (props) => {
  const { classes, comments } = props;

  const noComments = comments.length;

  return (
    <div className="comments">
      <Typography variant="h5" component="h3">
        {noComments} comment{noComments !== 1 && "s"}
      </Typography>
      {
        noComments > 0 && (
          comments.map((c, i) => (
            <Paper
              className="comment"
              elevation={1}
              key={c.author.name + i}
            >
              <Typography variant="h6" component="h3">
                by {c.author.name} <span className='post__author'>
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
    </div>
  )
};

CommentSection.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(CommentSection);
