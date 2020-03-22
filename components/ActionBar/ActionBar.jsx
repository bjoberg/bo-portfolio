import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SaveIcon from '@material-ui/icons/Save';

import ProfileMenu from './components/ProfileMenu';
import ElevationScroll from './components/ElevationScroll';
import ActionBarIconButton from './components/ActionBarIconButton';
import ActionBarStyles from './ActionBar.styles';
import User from '../../models/user';

const useStyles = makeStyles(ActionBarStyles);

const ActionBar = (props) => {
  const classes = useStyles();
  const {
    title,
    navButtonColor,
    actionButtonColor,
    isDisabled,
    elevateOnScroll,
    showDelete,
    showInfo,
    showAddPhoto,
    showSave,
    showAddGroup,
    showAvatar,
    user,
    navButton,
    handleNav,
    handleDelete,
    handleInfo,
    handleAddPhoto,
    handleSave,
    handleAddGroup,
    handleLogout,
    handleLogin,
  } = props;

  return (
    <ElevationScroll elevateOnScroll={elevateOnScroll}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color={navButtonColor}
            className={classes.navButton}
            edge="start"
            onClick={handleNav}
          >
            {navButton}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <div className={clsx(showAvatar && classes.actionButtonGroup)}>
            {showDelete && (
              <ActionBarIconButton
                title="Delete"
                color={actionButtonColor}
                isDisabled={isDisabled}
                handleOnClick={handleDelete}
                icon={<DeleteIcon />}
              />
            )}
            {showAddPhoto && (
              <ActionBarIconButton
                title="Add Image"
                color={actionButtonColor}
                isDisabled={isDisabled}
                handleOnClick={handleAddPhoto}
                icon={<AddPhotoIcon />}
              />
            )}
            {showAddGroup && (
              <ActionBarIconButton
                title="Add Group"
                color={actionButtonColor}
                isDisabled={isDisabled}
                handleOnClick={handleAddGroup}
                icon={<PhotoLibraryIcon />}
              />
            )}
            {showSave && (
              <ActionBarIconButton
                title="Save"
                color={actionButtonColor}
                isDisabled={isDisabled}
                handleOnClick={handleSave}
                icon={<SaveIcon />}
              />
            )}
            {showInfo && (
              <ActionBarIconButton
                title="Info"
                color={actionButtonColor}
                isDisabled={isDisabled}
                handleOnClick={handleInfo}
                icon={<InfoIcon />}
              />
            )}
          </div>
          {showAvatar && (
            <ProfileMenu user={user} handleLogout={handleLogout} handleLogin={handleLogin} />
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

ActionBar.propTypes = {
  title: PropTypes.string,
  navButtonColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  actionButtonColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  isDisabled: PropTypes.bool,
  elevateOnScroll: PropTypes.bool,
  showDelete: PropTypes.bool,
  showInfo: PropTypes.bool,
  showAddPhoto: PropTypes.bool,
  showSave: PropTypes.bool,
  showAddGroup: PropTypes.bool,
  showAvatar: PropTypes.bool,
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
  }),
  navButton: PropTypes.element,
  handleNav: PropTypes.func,
  handleDelete: PropTypes.func,
  handleInfo: PropTypes.func,
  handleAddPhoto: PropTypes.func,
  handleAddGroup: PropTypes.func,
  handleSave: PropTypes.func,
  handleLogout: PropTypes.func,
  handleLogin: PropTypes.func,
};

ActionBar.defaultProps = {
  title: '',
  navButtonColor: 'default',
  actionButtonColor: 'default',
  isDisabled: false,
  elevateOnScroll: false,
  showDelete: false,
  showInfo: false,
  showAddPhoto: false,
  showSave: false,
  showAddGroup: false,
  showAvatar: false,
  user: undefined,
  navButton: <MenuIcon />,
  handleNav: () => { },
  handleDelete: () => { },
  handleInfo: () => { },
  handleAddPhoto: () => { },
  handleAddGroup: () => { },
  handleSave: () => { },
  handleLogout: () => { },
  handleLogin: () => { },
};

export default ActionBar;
