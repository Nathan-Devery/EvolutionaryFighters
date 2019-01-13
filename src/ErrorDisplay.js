import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class ErrorDisplay extends React.Component {
  constructor(props){
    super(props);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    //this.setState({ open: false });
    this.props.handleCloseState();
  };

  render() {
    const { classes } = this.props;
    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.display}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">{this.props.msg}</span>
          }
          action={[
            
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
      />
    );
  }
}

ErrorDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorDisplay);