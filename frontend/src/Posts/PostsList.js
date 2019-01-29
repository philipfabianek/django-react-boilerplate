import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";
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

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  };

  componentDidMount() {
    this.fetchPosts();
  };

  fetchPosts() {
    axios.get('/api_posts/fetch-posts')
    .then(({ data }) => this.setState({ posts: data.posts }));
  };

  render() {
    const { classes } = this.props;
    const { posts } = this.state;

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

export default withStyles(styles)(PostsList);
