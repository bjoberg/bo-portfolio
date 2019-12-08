import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import AlertDialog from '../../../../components/alert-dialog/alert-dialog.component';
import { ActionBar } from '../../../../components/action-bar';


const GroupPageActionBar = (props) => {
  const {
    selectedItems, groupTitle, handleClose, handleDelete, isDisabled,
  } = props;

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

  const openDeleteDiaglog = () => setDeleteDialogIsOpen(true);
  const closeDeleteDialog = () => setDeleteDialogIsOpen(false);

  return (
    <Fragment>
      <ActionBar
        handleClose={handleClose}
        isDisabled={isDisabled}
        title={`${selectedItems.length} selected`}
        actionButtonColor="secondary"
        showDelete
        handleDelete={openDeleteDiaglog}
      />
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
