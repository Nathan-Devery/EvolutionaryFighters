import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';

class AlertDialog extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Evolutionary Fighters - ALPHA 1.0"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is a genetic algorithm demo.
              <br></br>
              <br></br>
              Randomly generated fighters are created - each is scored by their sum 'wins'. Darwinism
              is applied: the fittest breed, the remaining die, and optimas are converged upon. The genome
              of everyone is displayed - these thirteen numbers can be pasted and edited into the 'exhibit'
              section, allowing you to view the individual. 
              <br></br>
              <br></br>
              Watch as multiple designs evolve and compete. Play with the parameters to optimize - the defaults
              serve as a baseline.
              <br></br>
              <br></br>
              Works best on desktop. Scroll right on the table to view genomes.
              <br></br>
              <br></br>
              <i>Nathan Devery - 18/2/19</i>
            </DialogContentText>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;