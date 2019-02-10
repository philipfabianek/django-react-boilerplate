import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

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
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
  },
  field: {
    marginTop: "1.2rem",
  },
  submitButton: {
    marginTop: "1.6rem",
  },
});

class Signup extends React.Component {
  state = {
    fields: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      axios.post("/api_auth/signup", fields)
      .then(() => this.props.history.push("/login"));
    }
  };

  validateField = (key) => {
    const { errors, fields } = this.state;
    const value = fields[key];
    let hasError = !validators[key](value);
    if (key === 'confirmPassword' && !hasError) {
      // passwords must equal
      hasError = value !== fields['password']
    }

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
          Create an account
        </Typography>

        <form
          autoComplete="true"
          onSubmit={this.onSubmit}
        >
          {this.renderField("username", "Username", { autoFocus: true, error: true })}
          {this.renderField("email", "Email")}
          {this.renderField("password", "Password")}
          {this.renderField("confirmPassword", "Confirm password", { type: "password" })}

          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  };
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
