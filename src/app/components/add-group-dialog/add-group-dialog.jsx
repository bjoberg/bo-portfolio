import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
} from '@material-ui/core';

import {
  isValidTitle, isValidDescription, isValidThumbailUrl, isValidImageUrl,
} from './utils';

const AddGroupDialog = (props) => {
  const { isOpen, handleClose } = props;

  const [isValidForm, setIsValidForm] = useState(false);

  // Title
  const [title, setTitle] = useState({
    hasError: false,
    isRequired: true,
    helperText: '',
    value: '',
  });
  const updateTitle = (e) => {
    setTitle({ ...title, value: e.target.value });
  };
  const updateTitleError = (hasError, helperText) => {
    setTitle({ ...title, hasError, helperText });
  };

  // Thumbnail Url
  const [thumbnailUrl, setThumbnailUrl] = useState({
    hasError: false,
    isRequired: true,
    helperText: '',
    value: '',
  });
  const updateThumbnailUrl = (e) => {
    setThumbnailUrl({ ...thumbnailUrl, value: e.target.value });
  };
  const updateThumbnailUrlError = (hasError, helperText) => {
    setThumbnailUrl({ ...thumbnailUrl, hasError, helperText });
  };

  // Image Url
  const [imageUrl, setImageUrl] = useState({
    hasError: false,
    isRequired: true,
    helperText: '',
    value: '',
  });
  const updateImageUrl = (e) => {
    setImageUrl({ ...imageUrl, value: e.target.value });
  };
  const updateImageUrlError = (hasError, helperText) => {
    setImageUrl({ ...imageUrl, hasError, helperText });
  };

  // Description
  const [description, setDescription] = useState({
    hasError: false,
    isRequired: false,
    helperText: '',
    value: '',
  });
  const updateDescription = (e) => {
    setDescription({ ...description, value: e.target.value });
  };
  const updateDescriptionError = (hasError, helperText) => {
    setDescription({ ...description, hasError, helperText });
  };

  const validateTitle = () => {
    let isValid = false;
    try {
      if (isValidTitle(title.value)) {
        updateTitleError(false, '');
        isValid = true;
      }
    } catch (error) {
      updateTitleError(true, error.message);
    }
    return isValid;
  };

  const validateThumbnailUrl = () => {
    let isValid = false;
    try {
      if (isValidThumbailUrl(thumbnailUrl.value)) {
        updateThumbnailUrlError(false, '');
        isValid = true;
      }
    } catch (error) {
      updateThumbnailUrlError(true, error.message);
    }
    return isValid;
  };

  const validateImageUrl = () => {
    let isValid = false;
    try {
      if (isValidImageUrl(imageUrl.value)) {
        updateImageUrlError(false, '');
        isValid = true;
      }
    } catch (error) {
      updateImageUrlError(true, error.message);
    }
    return isValid;
  };

  const validateDescription = () => {
    let isValid = false;
    try {
      if (isValidDescription(description.value)) {
        updateDescriptionError(false, '');
        isValid = true;
      }
    } catch (error) {
      updateDescriptionError(true, error.message);
    }
    return isValid;
  };

  const validateForm = () => {
    let isValid = true;
    if (!title.hasError) isValid = false;
    if (!thumbnailUrl.hasError) isValid = false;
    if (!imageUrl.hasErro) isValid = false;
    if (!description.hasError) isValid = false;
    return isValid;
  };

  /**
   * Save the group based on the defined group data
   */
  const handleSave = () => {
    if (validateForm) {
      const group = {
        title: title.value,
        description: description.value,
        thumbnailUrl: thumbnailUrl.value,
        imageUrl: imageUrl.value,
      };
      console.log(group);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="add-group-title"
      aria-describedby="add-group-body"
    >
      <DialogTitle id="add-group-title">New Group</DialogTitle>
      <DialogContent id="add-group-body" dividers>
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
          onBlur={() => validateTitle()}
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
          onBlur={() => validateThumbnailUrl()}
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
          onBlur={() => validateImageUrl()}
        />
        <TextField
          multiline
          id="description"
          label="Description"
          margin="normal"
          variant="outlined"
          fullWidth
          rows="4"
          required={description.isRequired}
          error={description.hasError}
          helperText={description.helperText}
          onChange={e => updateDescription(e)}
          onBlur={() => validateDescription()}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={!isValidForm}
          onClick={() => handleSave()}
        >
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
