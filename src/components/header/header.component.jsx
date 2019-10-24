import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import HeaderStlyes from './header.styles';
import GoogleUser from '../../models/google-user.model';
import ElevationScroll from '../elevation-scroll/elevation-scroll.component';
import ProfileMenu from './components/profile-menu/profile-menu.component';

const useStyles = makeStyles(HeaderStlyes);

const Header = (props) => {
  const classes = useStyles();
  const {
    title, handleToggle, handleLogout, user,
  } = props;

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <ProfileMenu user={user} handleLogout={handleLogout} />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  handleToggle: PropTypes.func,
  handleLogout: PropTypes.func,
  user: PropTypes.instanceOf(GoogleUser),
};

Header.defaultProps = {
  title: '',
  handleToggle: () => { },
  handleLogout: () => { },
  user: undefined,
};

export default Header;
