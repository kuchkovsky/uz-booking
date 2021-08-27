import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props}/>);

const CaptchaDialog = props => {
  const {
    isCaptchaDialogOpen,
    isCaptchaError,
    captchaCode,
    captchaHash,
    changeCaptchaDialogOpen,
    changeCaptchaCode,
    loadTrainList
  } = props;

  const closeDialog = () => changeCaptchaDialogOpen(false);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      loadTrainList();
    }
  };

  return (
    <Dialog
      open={isCaptchaDialogOpen}
      TransitionComponent={Transition}
      onClose={closeDialog}
    >
      <DialogTitle>Captcha</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a captcha
        </DialogContentText>
        <img src={`https://booking.uz.gov.ua/en/captcha/?${captchaHash}`}/>
        <TextField
          value={captchaCode}
          error={isCaptchaError}
          helperText={isCaptchaError ? "Please try again" : undefined}
          autoFocus
          margin="dense"
          fullWidth
          onChange={e => changeCaptchaCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => loadTrainList()}>
            Send
          </Button>
      </DialogActions>
    </Dialog>
  );
};

CaptchaDialog.propTypes = {
  isCaptchaDialogOpen: PropTypes.bool.isRequired,
  isCaptchaError: PropTypes.bool.isRequired,
  captchaCode: PropTypes.string,
  captchaHash: PropTypes.string,
  changeCaptchaDialogOpen: PropTypes.func.isRequired,
  changeCaptchaCode: PropTypes.func.isRequired,
  loadTrainList: PropTypes.func.isRequired,
};

export default CaptchaDialog;
