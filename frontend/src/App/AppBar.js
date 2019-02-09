import axios from 'axios';
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

// state
import { compose } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user";

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
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
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  logoutButton: {
    color: "#fff",
    letterSpacing: ".5px",
    margin: "0 .5rem 0 1.5rem",
  },
});

const SearchAppBar = (props) => {
  const { classes } = props;

  const logout = () => {
    axios.post("/api_auth/logout")
    .then((res) => {
      props.logoutUser();
      props.history.push("/login");
    })
  };

  const isLoggedIn = !isEmpty(props.user);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              {props.title}
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
          {
            isLoggedIn ? (
              <Button
                className={classes.logoutButton}
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button className={classes.logoutButton}>
                  Login
                </Button>
              </Link>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
