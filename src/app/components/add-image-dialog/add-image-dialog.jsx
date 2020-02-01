import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  defaultTitle,
  defaultThumbnailUrl,
  defaultImageUrl,
  defaultDescription,
  defaultWidth,
  defaultHeight,
  defaultLocation,
} from './defaults';
import AddImageDialogStyles from './add-image-dialog.styles';

const useStyles = makeStyles(AddImageDialogStyles);

const AddImageDialog = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose } = props;

  const [title, setTitle] = useState(defaultTitle);
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultThumbnailUrl);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [location, setLocation] = useState(defaultLocation);
  const [description, setDescription] = useState(defaultDescription);

  const updateTitle = (e) => {
    setTitle({ ...title, value: e.target.value });
  };
  const updateTitleError = (hasError, helperText) => {
    setTitle({ ...title, hasError, helperText });
  };
  const updateThumbnailUrl = (e) => {
    setThumbnailUrl({ ...thumbnailUrl, value: e.target.value });
  };
  const updateThumbnailUrlError = (hasError, helperText) => {
    setThumbnailUrl({ ...thumbnailUrl, hasError, helperText });
  };
  const updateImageUrl = (e) => {
    setImageUrl({ ...imageUrl, value: e.target.value });
  };
  const updateImageUrlError = (hasError, helperText) => {
    setImageUrl({ ...imageUrl, hasError, helperText });
  };
  const updateLocation = (e) => {
    setLocation({ ...location, value: e.target.value });
  };
  const updateLocationError = (hasError, helperText) => {
    setLocation({ ...location, hasError, helperText });
  };
  const updateDescription = (e) => {
    setDescription({ ...description, value: e.target.value });
  };
  const updateDescriptionError = (hasError, helperText) => {
    setDescription({ ...description, hasError, helperText });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="add-image-title"
      aria-describedby="add-image-body"
    >
      <DialogTitle id="add-image-title">New Image</DialogTitle>
      <DialogContent id="add-image-body" dividers>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <div className={classes.imgContainer}>
              <img
                alt="imageUrl"
                src={imageUrl.value}
                className={classes.img}
              />
            </div>
            <Typography variant="caption">Image Url</Typography>
          </Grid>
          <Grid item>
            <div className={classes.imgContainer}>
              <img
                alt="thumbnailUrl"
                src={thumbnailUrl.value}
                className={classes.img}
              />
            </div>
            <Typography variant="caption">Thumbnail Url</Typography>
          </Grid>
        </Grid>
        <TextField
          id="title"
          label="Title"
          margin="normal"
          variant="outlined"
          fullWidth
          value={title.value}
          required={title.isRequired}
          error={title.hasError}
          helperText={title.helperText}
          onChange={e => updateTitle(e)}
        />
        <TextField
          id="thumbnailUrl"
          label="Thumbnail Url"
          margin="normal"
          variant="outlined"
          fullWidth
          value={thumbnailUrl.value}
          required={thumbnailUrl.isRequired}
          error={thumbnailUrl.hasError}
          helperText={thumbnailUrl.helperText}
          onChange={e => updateThumbnailUrl(e)}
        />
        <TextField
          id="imageUrl"
          label="Image Url"
          margin="normal"
          variant="outlined"
          fullWidth
          value={imageUrl.value}
          required={imageUrl.isRequired}
          error={imageUrl.hasError}
          helperText={imageUrl.helperText}
          onChange={e => updateImageUrl(e)}
        />
        <TextField
          id="location"
          label="Location"
          margin="normal"
          variant="outlined"
          fullWidth
          value={location.value}
          required={location.isRequired}
          error={location.hasError}
          helperText={location.helperText}
          onChange={e => updateLocation(e)}
        />
        <TextField
          id="width"
          label="Width"
          margin="normal"
          variant="outlined"
          disabled
          fullWidth
          value={width.value}
          required={width.isRequired}
          error={width.hasError}
          helperText={width.helperText}
        />
        <TextField
          id="height"
          label="Height"
          margin="normal"
          variant="outlined"
          disabled
          fullWidth
          value={height.value}
          required={height.isRequired}
          error={height.hasError}
          helperText={height.helperText}
        />
        <TextField
          multiline
          id="description"
          label="Description"
          margin="normal"
          variant="outlined"
          fullWidth
          rows="4"
          value={description.value}
          required={description.isRequired}
          error={description.hasError}
          helperText={description.helperText}
          onChange={e => updateDescription(e)}
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
