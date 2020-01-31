import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@material-ui/core';

const AddImageDialog = (props) => {
  const { isOpen, handleClose } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="add-image-title"
      aria-describedby="add-image-body"
    >
      <DialogTitle id="add-image-title">New Image</DialogTitle>
      <DialogContent id="add-image-body" dividers />
      <DialogActions>
        <Button
          color="primary"
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
        <Button color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddImageDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

AddImageDialog.defaultProps = {
  isOpen: false,
  handleClose: () => { },
};

export default AddImageDialog;
