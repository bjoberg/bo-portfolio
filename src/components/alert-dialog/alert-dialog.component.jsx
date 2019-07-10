import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props) => {
  const {
    handleClose,
    handleConfirm,
    isOpen,
    title,
    body,
    closeButtonText,
    confirmButtonText,
  } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
        >
          {closeButtonText}
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          autoFocus
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  closeButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
};

AlertDialog.defaultProps = {
  isOpen: false,
  title: 'Default title',
  body: 'Default body -- provide the "body" prop to set this value.',
  closeButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
};

export default AlertDialog;
