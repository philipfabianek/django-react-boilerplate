import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// Utils
import validators from "./validators";

const styles = theme => ({
  text: {
    marginTop: ".7rem",
  },
  submitButton: {
    marginTop: "1rem",
  },
});

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      error: null,
    };
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.validateText()) {
      this.props.onSubmit(this.state.text);
      this.setState({ text: "" });
    }
  };

  validateText = () => {
    const { text } = this.state;
    let hasError = !validators.text(text);
    this.setState({ error: hasError });
    return !hasError;
  };

  onTextChange = value => {
    const { error } = this.state;

    this.setState({ text: value }, () => {
      if (error) {
        this.validateText();
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper
        className="comment"
        elevation={1}
      >
        <Typography variant="h6" component="h3">
          Write a comment
        </Typography>
        <TextField
          className={classes.text}
          error={this.state.error}
          fullWidth
          label='Comment text'
          name='text'
          onChange={(e) => this.onTextChange(e.target.value)}
          onBlur={(e) => {
            if (!e.target.value) {
              this.setState({ error: false });
              return;
            }
            this.validateText();
          }}
          required
          type="text"
          value={this.state.text}
          multiline
          rows={4}
          rowsMax={10}
          variant='outlined'
        />
        <Button
          className={classes.submitButton}
          onClick={this.onSubmit}
          variant="contained"
          color="primary"
          size="medium"
        >
          Submit
        </Button>
      </Paper>
    );
  };
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default withStyles(styles)(CommentForm);
