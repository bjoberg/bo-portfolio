import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ImageFormActionStyles from './image-form-actions.styles';

const useStyles = makeStyles(ImageFormActionStyles);

const ImageFormActions = (props) => {
  const classes = useStyles();
  const {
    imageExists,
    isDisabled,
    handleDelete,
    handleUpdate,
    handleCreate,
    deleteButtonText,
    updateButtonText,
    createButtonText,
  } = props;

  return (
    <Fragment>
      {imageExists
        ? (
          <Fragment>
            <Button
              id="btn-delete"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleDelete}
              disabled={isDisabled}
            >
              {deleteButtonText}
            </Button>
            <Button
              id="btn-update"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleUpdate}
              disabled={isDisabled}
            >
              {updateButtonText}
            </Button>
          </Fragment>
        )
        : (
          <Button
            id="btn-update"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleCreate}
            disabled={isDisabled}
          >
            {createButtonText}
          </Button>
        )
      }
    </Fragment>
  );
};

ImageFormActions.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  imageExists: PropTypes.bool,
  isDisabled: PropTypes.bool,
  deleteButtonText: PropTypes.string,
  updateButtonText: PropTypes.string,
  createButtonText: PropTypes.string,
};

ImageFormActions.defaultProps = {
  imageExists: false,
  isDisabled: false,
  deleteButtonText: 'Delete',
  updateButtonText: 'Update',
  createButtonText: 'Create',
};

export default ImageFormActions;
