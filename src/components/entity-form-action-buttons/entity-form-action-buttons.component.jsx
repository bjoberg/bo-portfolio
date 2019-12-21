import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EntityFormActionButtonsStyles from './entity-form-action-buttons.styles';

const useStyles = makeStyles(EntityFormActionButtonsStyles);

const EntityFormActionButtons = (props) => {
  const classes = useStyles();
  const {
    entityExists,
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
      {entityExists
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

EntityFormActionButtons.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  entityExists: PropTypes.bool,
  isDisabled: PropTypes.bool,
  deleteButtonText: PropTypes.string,
  updateButtonText: PropTypes.string,
  createButtonText: PropTypes.string,
};

EntityFormActionButtons.defaultProps = {
  entityExists: false,
  isDisabled: false,
  deleteButtonText: 'Delete',
  updateButtonText: 'Update',
  createButtonText: 'Create',
};

export default EntityFormActionButtons;
