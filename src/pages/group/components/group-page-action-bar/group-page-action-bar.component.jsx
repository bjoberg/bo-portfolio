import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, AppBar, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import GroupPageActionBarStyles from './group-page-action-bar.styles';

const useStyles = makeStyles(GroupPageActionBarStyles);

const GroupPageActionBar = (props) => {
  const classes = useStyles();
  const {
    selectedItems, handleClose, handleDelete, isDisabled,
  } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
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
            onClick={() => handleDelete()}
            disabled={isDisabled}
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

GroupPageActionBar.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  isDisabled: PropTypes.bool,
};

GroupPageActionBar.defaultProps = {
  selectedItems: [],
  handleClose: () => { },
  handleDelete: () => { },
  isDisabled: false,
};

export default GroupPageActionBar;
