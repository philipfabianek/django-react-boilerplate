import React from 'react';

// Material-UI
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    marginTop: "4rem",
    textAlign: "center",
  },
  description: {
    fontWeight: "400",
    marginTop: "2.6rem",
    textAlign: "center",
  },
});

const ConfirmationFailed = ({ classes }) => {
  const { title, description } = classes;

  return (
    <div>
      <Typography className={title} variant="h4" component="h1">
        Confirmation failed :(
      </Typography>
      <Typography className={description} variant="h6" component="h3">
        Haven't you already confirmed your account?
        <br />If you can't log in, something went wrong.
        <br />Check if you haven't accidentally changed part of the URL
        <br />or contact us at help@example.com
      </Typography>
    </div>
  );
};

export default withStyles(styles)(ConfirmationFailed);
