import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, AppBar, Toolbar, IconButton,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import ElevationScroll from '../../../../components/elevation-scroll/elevation-scroll.component';
import GroupPageAppBarStyles from './group-page-app-bar.styles';

const useStyles = makeStyles(GroupPageAppBarStyles);

const GroupPageAppBar = (props) => {
  const classes = useStyles();
  const { handleClose, isEditable } = props;

  return (
    <ElevationScroll>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.icon}
            color="inherit"
            aria-label="Close"
            onClick={() => handleClose()}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className={classes.grow} />
          {isEditable && (
            <IconButton
              edge="start"
              className={classes.icon}
              aria-label="add-photo"
            >
              <AddPhotoIcon />
            </IconButton>
          )}
          <IconButton
            edge="start"
            aria-label="info"
          >
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

GroupPageAppBar.propTypes = {
  handleClose: PropTypes.func,
  isEditable: PropTypes.bool,
};

GroupPageAppBar.defaultProps = {
  handleClose: () => { },
  isEditable: false,
};

export default GroupPageAppBar;
