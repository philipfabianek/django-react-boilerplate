import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  // Incoming
});

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  };

  componentDidMount() {
    this.fetchPost();
  };

  fetchPost() {
    axios.get(`/api_posts/get-post/${this.props.match.params.id}`)
    .then(({ data }) => this.setState({ post: data.post }));
  };

  render() {
    const { classes } = this.props;
    const { post } = this.state;

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
              style={{
                fontSize: "16px",
                letterSpacing: ".5px",
                lineHeight: "155%",
                marginTop: "1rem"
              }}
            >
              {post.text}
            </Typography>
          </div>
        </Paper>
      </div>
    );
  };
};

Post.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Post);
