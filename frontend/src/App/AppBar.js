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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuItem: {
    width: '90px',
  },
});

class SearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  onLogout = () => {
    axios.post("/api_auth/logout")
    .then((res) => {
      this.handleMenuClose();
      this.props.logoutUser();
      this.props.history.push("/login");
    })
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = !!anchorEl;
    const isMobileMenuOpen = !!mobileMoreAnchorEl;
    const isLoggedIn = !isEmpty(this.props.user);

    const renderMenu = (type) => {
      const isMobile = type === 'mobile';
      const anchorElement = isMobile ? mobileMoreAnchorEl : anchorEl;
      const isOpen = isMobile ? isMobileMenuOpen : isMenuOpen;

      return (
        <Menu
          anchorEl={anchorElement}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          disableAutoFocusItem
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          transitionDuration={{
            enter: 500,
            exit: 0,
          }}
          open={isOpen}
          onClose={this.handleMenuClose}
        >
          {isLoggedIn && (
            <MenuItem
              className={classes.menuItem}
              onClick={this.onLogout}
            >Logout</MenuItem>
          )}
          {!isLoggedIn && (
            <MenuItem
              className={classes.menuItem}
              component={Link}
              onClick={this.handleMenuClose}
              to="/login"
            >Login</MenuItem>
          )}
          {!isLoggedIn && (
            <MenuItem
              className={classes.menuItem}
              component={Link}
              onClick={this.handleMenuClose}
              to="/signup"
            >Sign up</MenuItem>
          )}
        </Menu>
      );
    };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Link to="/">
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
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu('desktop')}
        {renderMenu('mobile')}
      </div>
    );
  };
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
