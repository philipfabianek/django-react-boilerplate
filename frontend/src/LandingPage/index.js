import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Material-UI
import Recent from '@material-ui/icons/History';
import Login from '@material-ui/icons/AccountCircle';
import Signup from '@material-ui/icons/PersonAdd';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  title: {
    color: "#fff",
    letterSpacing: 1,
    paddingTop: 80,
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    letterSpacing: 1.5,
    paddingTop: 26,
    textAlign: "center",
  },
  fab: {
    letterSpacing: 1,
    marginTop: 14,
    marginRight: 10,
    marginLeft: 10,
  },
  fabIcon: {
    marginRight: 8,
  },
  or: {
    color: "#fff",
    letterSpacing: 1.5,
  },
};

class LandingPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="landing-page">
        <Typography className={classes.title} variant="h2">
          Django React
        </Typography>
        <Typography className={classes.subtitle} variant="h5">
          Simple boilerplate / posts application
        </Typography>
        <div className="landing-page__action">
          <div className="landing-page__buttons">
            <Fab
              aria-label="Browse recent posts"
              className={classes.fab}
              component={Link}
              to="/recent"
              variant="extended"
              size="large"
              style={{ fontSize: 15, padding: "10px 22px" }}
            >
              <Recent className={classes.fabIcon} />
              Browse recent posts
            </Fab>
          </div>
          <div className="landing-page__or">
            <Typography className={classes.or} variant="h5">
              or
            </Typography>
          </div>
          <div className="landing-page__buttons">
            <Fab
              aria-label="Sign up"
              className={classes.fab}
              component={Link}
              to="/signup"
              variant="extended"
              size="medium"
            >
              <Signup className={classes.fabIcon} />
              Sign up
            </Fab>
            <Fab
              aria-label="Log in"
              className={classes.fab}
              component={Link}
              to="/login"
              variant="extended"
              size="medium"
            >
              <Login className={classes.fabIcon} />
              Log in
            </Fab>
          </div>
        </div>
      </div>
    );
  };
};

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
