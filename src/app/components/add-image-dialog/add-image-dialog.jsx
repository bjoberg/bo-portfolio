import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AddImageDialogStyles from './add-image-dialog.styles';

const useStyles = makeStyles(AddImageDialogStyles);

const AddImageDialog = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="add-image-title"
      aria-describedby="add-image-body"
    >
      <DialogTitle id="add-image-title">New Image</DialogTitle>
      <DialogContent id="add-image-body" dividers>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.imgContainer} />
            <Typography variant="caption">Image Url</Typography>
          </Grid>
          <Grid item>
            <div className={classes.imgContainer} />
            <Typography variant="caption">Thumbnail Url</Typography>
          </Grid>
        </Grid>
        <TextField
          id="title"
          label="Title"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="thumbnailUrl"
          label="Thumbnail Url"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="imageUrl"
          label="Image Url"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="location"
          label="Location"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="width"
          label="Width"
          margin="normal"
          variant="outlined"
          disabled
          fullWidth
        />
        <TextField
          id="height"
          label="Height"
          margin="normal"
          variant="outlined"
          disabled
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
