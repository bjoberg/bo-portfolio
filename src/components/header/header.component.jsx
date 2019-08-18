import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import ElevationScroll from '../elevation-scroll/elevation-scroll.component';
import FullDrawer from '../full-drawer/full-drawer.component';
import MiniDrawer from '../mini-drawer/mini-drawer.component';
import HeaderStlyes from './header.styles';

const useStyles = makeStyles(HeaderStlyes);

const Header = (props) => {
  const classes = useStyles();
  const { title, drawerIsOpen, handleToggleDrawer } = props;

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={handleToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <FullDrawer
        isOpen={drawerIsOpen}
        handleClose={handleToggleDrawer}
      />
      <MiniDrawer />
    </div>
  );
};

Header.propTypes = {
  handleToggleDrawer: PropTypes.func.isRequired,
  title: PropTypes.string,
  drawerIsOpen: PropTypes.bool,
};

Header.defaultProps = {
  title: '',
  drawerIsOpen: false,
};

export default Header;
