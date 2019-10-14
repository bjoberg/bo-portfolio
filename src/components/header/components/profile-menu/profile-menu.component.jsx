import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

import ProfileMenuStyles from './profile-menu.styles';

const useStyles = makeStyles(ProfileMenuStyles);

const ProfileMenu = (props) => {
  const classes = useStyles();
  const { user } = props;
  let avatar;

  if (user) {
    if (user.picture) {
      avatar = (
        <Avatar
          alt={user.name}
          src={user.picture}
          className={classes.avatar}
        />
      );
    } else {
      avatar = (<AccountCircle />);
    }
  }

  if (user) {
    return (
      <IconButton
        color="inherit"
        className={classes.iconButton}
      >
        {avatar}
      </IconButton>
    );
  }
  return null;
};

ProfileMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
    email: PropTypes.string,
  }),
};

ProfileMenu.defaultProps = {
  user: undefined,
};

export default ProfileMenu;
