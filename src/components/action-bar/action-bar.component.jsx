import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import ActionBarStyles from './action-bar.styles';
import ElevationScroll from '../elevation-scroll/elevation-scroll.component';

const useStyles = makeStyles(ActionBarStyles);

const ActionBar = (props) => {
  const classes = useStyles();
  const {
    handleClose,
    isDisabled,
    elevateOnScroll,
    title,
    closeButtonColor,
    actionButtonColor,
    closeButton,
    showDelete,
    handleDelete,
    showInfo,
    handleInfo,
    showAddPhoto,
    handleAddPhoto,
  } = props;

  return (
    <ElevationScroll elevateOnScroll={elevateOnScroll}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color={closeButtonColor}
            className={classes.closeButton}
            aria-label="close"
            onClick={() => handleClose()}
            disabled={isDisabled}
          >
            {closeButton}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {showDelete && (
            <IconButton
              color={actionButtonColor}
              aria-label="delete"
              onClick={() => handleDelete()}
              disabled={isDisabled}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {showAddPhoto && (
            <IconButton
              color={actionButtonColor}
              aria-label="add-photo"
              onClick={() => handleAddPhoto()}
              disabled={isDisabled}
            >
              <AddPhotoIcon />
            </IconButton>
          )}
          {showInfo && (
            <IconButton
              color={actionButtonColor}
              aria-label="info"
              onClick={() => handleInfo()}
              disabled={isDisabled}
            >
              <InfoIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

ActionBar.propTypes = {
  handleClose: PropTypes.func,
  isDisabled: PropTypes.bool,
  elevateOnScroll: PropTypes.bool,
  title: PropTypes.string,
  closeButtonColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  actionButtonColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  closeButton: PropTypes.element,
  showDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
  showInfo: PropTypes.bool,
  handleInfo: PropTypes.func,
  showAddPhoto: PropTypes.bool,
  handleAddPhoto: PropTypes.func,
};

ActionBar.defaultProps = {
  handleClose: () => { },
  isDisabled: false,
  elevateOnScroll: false,
  title: '',
  closeButtonColor: 'default',
  actionButtonColor: 'default',
  closeButton: <CloseIcon />,
  showDelete: false,
  handleDelete: () => { },
  showInfo: false,
  handleInfo: () => { },
  showAddPhoto: false,
  handleAddPhoto: () => { },
};

export default ActionBar;
