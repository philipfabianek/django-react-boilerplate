import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// State
import { connect } from "react-redux";

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
});

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  };

  render() {
    const { classes, posts } = this.props;

    return (
      <div className='posts-list'>
        {
          posts.map((p, i) => (
            <div key={p.headline + i}>
              <Paper className='posts-list__post' elevation={1}>
                <div className='posts-list__post__content'>
                  <Typography variant="h5" component="h3">
                    {p.headline}
                  </Typography>
                  <Typography
                    component="p"
                    className={classes.text}
                  >
                    {p.text}
                  </Typography>
                </div>
                <Link to={`/post/${p.id}`}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    Read more
                  </Button>
                </Link>
              </Paper>
            </div>
          ))
        }
      </div>
    );
  };
};

PostsList.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(withStyles(styles)(PostsList));
