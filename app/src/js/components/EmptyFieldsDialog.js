import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props}/>);

const EmptyFieldsDialog = ({ isEmptyFieldsDialogOpen, changeEmptyFieldsDialogOpen }) => (
  <Dialog
    open={isEmptyFieldsDialogOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={() => changeEmptyFieldsDialogOpen(false)}
   >
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Please enter a departure and destination station
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => changeEmptyFieldsDialogOpen(false)} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

EmptyFieldsDialog.propTypes = {
  isEmptyFieldsDialogOpen: PropTypes.bool.isRequired,
  changeEmptyFieldsDialogOpen: PropTypes.func.isRequired,
};

export default EmptyFieldsDialog;
