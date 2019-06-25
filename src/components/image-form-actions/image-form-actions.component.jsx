import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { ImageFormActionStyles } from './image-form-actions.styles';

const useStyles = makeStyles(ImageFormActionStyles);

const ImageFormActions = (props) => {
  const classes = useStyles();
  const { imageExists, isDisabled, handleDelete, handleUpdate } = props;

  return (
  <Fragment>
    {imageExists ?
      <Fragment>
        <Button
          id="btn-delete"
          variant="contained" 
          color="secondary" 
          className={classes.button} 
          onClick={handleDelete}
          disabled={isDisabled}
          hidden>
          Delete
        </Button>
        <Button
          id="btn-update"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleUpdate}
          disabled={isDisabled}>
          Update
        </Button>
      </Fragment> :
      <Button
        id="btn-update"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => console.log('save')}
        disabled={isDisabled}>
        Create
      </Button>
    }
  </Fragment>
  );
};

ImageFormActions.propTypes = {
  imageExists: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func
};

export default ImageFormActions;