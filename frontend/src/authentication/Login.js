import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

// state
import { connect } from "react-redux";
import { loginUser } from "../actions/user";

// Material-UI
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import validators from "./validators";

const styles = theme => ({
  container: {
    margin: "0 auto",
    marginTop: "4rem",
    paddingBottom: "4rem",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
  },
  field: {
    marginTop: "1.2rem",
  },
  submitButton: {
    marginTop: "1.6rem",
  },
});

class Login extends React.Component {
  state = {
    fields: {
      email: "",
      password: "",
    },
    errors: {},
  };

  onSubmit = event => {
    event.preventDefault();

    let error = false;
    const { fields } = this.state;
    for (let key in fields) {
      this.validateField(key);
      if (this.state.errors[key]) {
        error = true;
      }
    }

    if (!error) {
      axios.post("/api_auth/login", fields)
      .then((res) => {
        const { data } = res;
        this.props.loginUser(data);
        // redirect to last page that is optionally set using AppBar login link
        const { state = {} } = this.props.location;
        const { lastPage = "/recent" } = state;
        this.props.history.push(lastPage);
      })
    }
  };

  validateField = (key) => {
    const { errors, fields } = this.state;
    const value = fields[key];
    let hasError = !validators[key](value);

    errors[key] = hasError;
    this.setState({ errors });
  };

  onFieldChange = (value, key) => {
    const { errors, fields } = this.state;

    fields[key] = value.trim();
    this.setState({ fields }, () => {
      // The error can disappear even before blur
      if (errors[key]) {
        this.validateField(key);
      }
    });
  };

  renderField = (key, label, options = {}) => {
    const { classes } = this.props;

    return (
      <TextField
        autoFocus={(options && options.autoFocus)}
        className={classes.field}
        error={this.state.errors[key]}
        fullWidth
        label={label}
        name={key}
        onChange={(e) => this.onFieldChange(e.target.value, key)}
        onBlur={() => this.validateField(key)}
        required
        type={options.type || key}
        value={this.state.fields[key]}
      />
    )
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="h4" component="h2">
          Log in
        </Typography>

        <form
          autoComplete="true"
          onSubmit={this.onSubmit}
        >
          {this.renderField("email", "Email", { autoFocus: true })}
          {this.renderField("password", "Password")}

          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  };
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));
