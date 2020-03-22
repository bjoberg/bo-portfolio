import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import ProfileMenuStyles from './ProfileMenu.styles';
import ProfilePopover from '../ProfilePopover/ProfilePopover';
import User from '../../../../models/user';

const useStyles = makeStyles(ProfileMenuStyles);

const ProfileMenu = (props) => {
  const classes = useStyles();
  const { user, handleLogout, handleLogin } = props;
  const { profile, isFetching } = user;
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const popoverIsOpen = Boolean(popoverAnchorEl);

  const handleIconButtonOnClick = event => setPopoverAnchorEl(event.currentTarget);
  const handleMenuClose = () => setPopoverAnchorEl(null);

  if (!profile && !isFetching) {
    return (
      <Button variant="outlined" size="small" onClick={handleLogin}>
        Login
      </Button>
    );
  }

  if (profile && !isFetching) {
    return (
      <Fragment>
        <IconButton
          color="inherit"
          className={classes.iconButton}
          onClick={handleIconButtonOnClick}
        >
          <Avatar
            alt={profile.name}
            src={profile.picture}
            className={classes.avatar}
          />
        </IconButton>
        <ProfilePopover
          isOpen={popoverIsOpen}
          anchorEl={popoverAnchorEl}
          handleClose={handleMenuClose}
          handleLogout={handleLogout}
          name={user.profile.name}
          email={user.profile.email}
          role={user.profile.role}
        />
      </Fragment>
    );
  }
  return null;
};

ProfileMenu.propTypes = {
  handleLogout: PropTypes.func,
  handleLogin: PropTypes.func,
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
  }),
};

ProfileMenu.defaultProps = {
  handleLogout: () => { },
  handleLogin: () => { },
  user: undefined,
};

export default ProfileMenu;
