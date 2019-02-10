import axios from 'axios';
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

// state
import { compose } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user";

// Material-UI
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

// Side navigation
import SideNavigation from "./SideNavigation"

// Utils
import { isEmpty } from "../utils/object";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    color: "#fff",
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 150,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class SearchAppBar extends React.Component {
  state = {
    isNavigationOpen: false,
  };

  toggleNavigation = () => {
    this.setState({
      isNavigationOpen: !this.state.isNavigationOpen,
    });
  };

  onLogout = () => {
    axios.post("/api_auth/logout")
    .then((res) => {
      this.props.logoutUser();
      this.props.history.push("/login");
    })
  };

  render() {
    // For LandingPage
    if (this.props.location.pathname === "/") {
      return null;
    }

    const { classes } = this.props;
    const isLoggedIn = !isEmpty(this.props.user);
    const lastPage = this.props.location.pathname;

    return (
      <div className={classes.root}>
        <SideNavigation
          lastPage={lastPage}
          isLoggedIn={isLoggedIn}
          open={this.state.isNavigationOpen}
          onClose={this.toggleNavigation}
          onLogout={this.onLogout}
        />

        <AppBar position="static">
          <Toolbar>
            <IconButton
              aria-label="Open drawer"
              className={classes.menuButton}
              onClick={this.toggleNavigation}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/recent">
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                {this.props.title}
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
};

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SearchAppBar);
