import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const PostsList = (props) => {
  const { classes, posts } = props;

  return (
    <div className={classes.container}>
      {
        posts.map((p, i) => (
          <div key={p.headline + i}>
            <Paper className={classes.post} elevation={1}>
              <div className='posts-list__post__content'>
                <Typography variant="h5" component="h3">
                  {p.headline}
                </Typography>
                <Typography
                  component="p"
                  style={{
                    fontSize: "16px",
                    letterSpacing: ".5px",
                    lineHeight: "155%",
                    marginTop: "1rem"
                  }}
                >
                  {p.text}
                </Typography>
              </div>
              <Button variant="outlined" color="primary" className={classes.button}>
                Read more
              </Button>
            </Paper>
          </div>
        ))
      }
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(PostsList);
