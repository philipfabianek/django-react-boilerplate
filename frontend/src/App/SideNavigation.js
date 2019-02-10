import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Material-UI
import Favorite from '@material-ui/icons/Favorite';
import Recent from '@material-ui/icons/History';
import Login from '@material-ui/icons/AccountCircle';
import Signup from '@material-ui/icons/PersonAdd';
import Logout from '@material-ui/icons/ExitToApp';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  title: {
    color: "#444",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 22,
  },
  list: {
    width: 250,
  },
};

const SideNavigation = (props) => {
  const { classes, isLoggedIn, lastPage } = props;

  const navigation = (
    <div className={classes.list}>
      <Typography className={classes.title} variant="h5">
        Menu
      </Typography>
      <Divider />
      <List>
        <Link to="/recent" onClick={props.onClose}>
          <ListItem button>
            <ListItemIcon><Recent /></ListItemIcon>
            <ListItemText primary='Recent posts' />
          </ListItem>
        </Link>
        {
          isLoggedIn && (
            <ListItem button>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary='Favorite posts' />
            </ListItem>
          )
        }
      </List>
      <Divider />
      <List>
        {
          !isLoggedIn ? (
            <div>
              <Link to={{ pathname: "/login", state: { lastPage } }} onClick={props.onClose}>
                <ListItem button>
                  <ListItemIcon><Login /></ListItemIcon>
                  <ListItemText primary='Log in' />
                </ListItem>
              </Link>
              <Link to="/signup" onClick={props.onClose}>
                <ListItem button>
                  <ListItemIcon><Signup /></ListItemIcon>
                  <ListItemText primary='Sign up' />
                </ListItem>
              </Link>
            </div>
          ) : (
            <ListItem button onClick={() => {
              props.onClose();
              props.onLogout();
            }}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary='Log out' />
            </ListItem>
          )
        }
      </List>
    </div>
  );

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
    >
      {navigation}
    </Drawer>
  );
};

SideNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lastPage: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideNavigation);
