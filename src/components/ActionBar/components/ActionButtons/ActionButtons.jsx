import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SaveIcon from '@material-ui/icons/Save';

import ActionBarIconButton from '../ActionBarIconButton';

const ActionButtons = (props) => {
  const {
    isDisabled,
    showDelete,
    showAddPhoto,
    showAddGroup,
    showSave,
    showInfo,
    color,
    handleDelete,
    handleAddPhoto,
    handleAddGroup,
    handleSave,
    handleInfo,
  } = props;

  return (
    <Fragment>
      {showDelete && (
        <ActionBarIconButton
          title="Delete"
          color={color}
          isDisabled={isDisabled}
          handleOnClick={handleDelete}
          icon={<DeleteIcon />}
        />
      )}
      {showAddPhoto && (
        <ActionBarIconButton
          title="Add Image"
          color={color}
          isDisabled={isDisabled}
          handleOnClick={handleAddPhoto}
          icon={<AddPhotoIcon />}
        />
      )}
      {showAddGroup && (
        <ActionBarIconButton
          title="Add Group"
          color={color}
          isDisabled={isDisabled}
          handleOnClick={handleAddGroup}
          icon={<PhotoLibraryIcon />}
        />
      )}
      {showSave && (
        <ActionBarIconButton
          title="Save"
          color={color}
          isDisabled={isDisabled}
          handleOnClick={handleSave}
          icon={<SaveIcon />}
        />
      )}
      {showInfo && (
        <ActionBarIconButton
          title="Info"
          color={color}
          isDisabled={isDisabled}
          handleOnClick={handleInfo}
          icon={<InfoIcon />}
        />
      )}
    </Fragment>
  );
};

ActionButtons.propTypes = {
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  isDisabled: PropTypes.bool,
  showDelete: PropTypes.bool,
  showInfo: PropTypes.bool,
  showAddPhoto: PropTypes.bool,
  showSave: PropTypes.bool,
  showAddGroup: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleInfo: PropTypes.func,
  handleAddPhoto: PropTypes.func,
  handleAddGroup: PropTypes.func,
  handleSave: PropTypes.func,
};

ActionButtons.defaultProps = {
  color: 'default',
  isDisabled: false,
  showDelete: false,
  showInfo: false,
  showAddPhoto: false,
  showSave: false,
  showAddGroup: false,
  handleDelete: () => { },
  handleInfo: () => { },
  handleAddPhoto: () => { },
  handleAddGroup: () => { },
  handleSave: () => { },
};

export default ActionButtons;
