import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import GroupPageActionBarStyles from './group-page-action-bar.styles';
import AlertDialog from '../../../../components/alert-dialog/alert-dialog.component';

const useStyles = makeStyles(GroupPageActionBarStyles);

const GroupPageActionBar = (props) => {
  const classes = useStyles();
  const {
    selectedItems, groupTitle, handleClose, handleDelete, isDisabled,
  } = props;

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

  const closeDeleteDialog = () => { setDeleteDialogIsOpen(false); };

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar} classes={{ root: { zIndex: 1500 } }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.closeButton}
            color="inherit"
            aria-label="Close"
            onClick={() => handleClose()}
            disabled={isDisabled}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {`${selectedItems.length} selected`}
          </Typography>
          <IconButton
            edge="start"
            color="secondary"
            aria-label="Delete"
            onClick={() => setDeleteDialogIsOpen(true)}
            disabled={isDisabled}
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AlertDialog
        id="alert-dialog--delete"
        isOpen={deleteDialogIsOpen}
        title="Remove images?"
        body={`You are about to remove ${selectedItems.length} images from ${groupTitle}. This will not delete the images, it will only disassociate the images from the group.`}
        closeButtonText="Cancel"
        confirmButtonText="Delete"
        handleClose={closeDeleteDialog}
        handleConfirm={handleDelete}
      />
    </Fragment>
  );
};

GroupPageActionBar.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  groupTitle: PropTypes.string,
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  isDisabled: PropTypes.bool,
};

GroupPageActionBar.defaultProps = {
  selectedItems: [],
  groupTitle: '',
  handleClose: () => { },
  handleDelete: () => { },
  isDisabled: false,
};

export default GroupPageActionBar;
