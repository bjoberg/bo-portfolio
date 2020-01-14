import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
} from '@material-ui/core';

const AddGroupDialog = (props) => {
  const { isOpen, handleClose } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">New Group</DialogTitle>
      <DialogContent dividers>
        <TextField
          id="title"
          label="Title"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="thumbnailUrl"
          label="Thumbnail url"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="imageUrl"
          label="Image url"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          multiline
          id="description"
          label="Description"
          margin="normal"
          variant="outlined"
          fullWidth
          rows="4"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddGroupDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

AddGroupDialog.defaultProps = {
  isOpen: false,
  handleClose: () => { },
};

export default AddGroupDialog;
