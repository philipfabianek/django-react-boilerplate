import axios from 'axios';
import { Link } from "react-router-dom";
import React from 'react';

// Material-UI
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

// App components
import Post from "./Post";

const styles = {
  title: {
    marginTop: 60,
  },
  hint: {
    marginTop: 20,
  },
  fab: {
    letterSpacing: .5,
    marginTop: 14,
  }
};

class FavoritePosts extends React.Component {
  state = {
    fetched: false,
    posts: [],
  };

  componentDidMount() {
    axios.get('/api_posts/favorite-posts')
    .then(({ data }) => this.setState({ fetched: true, posts: data.posts }));
  };

  render() {
    const { classes } = this.props;
    const { fetched, posts } = this.state;

    if (!fetched) {
      return null;
    }

    return (
      <div className='posts-list'>
        {
          posts.length > 0 ? (
            posts.map((p, i) => (
              <div key={p.headline + i}>
                <Post full={false} post={p} />
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Typography className={classes.title} variant="h5">
                You have no favorite posts.
              </Typography>
              <Typography className={classes.hint} variant="subtitle1">
                Browse some of the recent ones and choose which you like
              </Typography>
              <Fab
                aria-label="Browse recent posts"
                className={classes.fab}
                component={Link}
                to="/recent"
                color="primary"
                variant="extended"
                size="medium"
              >
                Browse recent posts
              </Fab>
            </div>
          )
        }
      </div>
    )
  };
};

export default withStyles(styles)(FavoritePosts);
