import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavContainerStyles from './nav-container.styles';
import Header from '../header/header.component';
import FullDrawer from '../full-drawer/full-drawer.component';
import MiniDrawer from '../mini-drawer/mini-drawer.component';
import GoogleUser from '../../models/google-user.model';

const useStyles = makeStyles(NavContainerStyles);

const NavContainer = (props) => {
  const classes = useStyles();
  const {
    closeDrawer, title, drawerIsOpen, toggleDrawer, user, handleLogout, isEditable,
  } = props;

  return (
    <Fragment>
      <ClickAwayListener onClickAway={closeDrawer}>
        {/* This div is needed because the ClickAwayListener needs a ref to bind to */}
        <div>
          <Header
            title={title}
            drawerIsOpen={drawerIsOpen}
            handleToggle={toggleDrawer}
            user={user}
            handleLogout={handleLogout}
            isEditable={isEditable}
          />
          <FullDrawer isOpen={drawerIsOpen} handleClose={closeDrawer} />
          <MiniDrawer />
        </div>
      </ClickAwayListener>
      <div className={classes.toolbar} />
    </Fragment>
  );
};

NavContainer.propTypes = {
  closeDrawer: PropTypes.func,
  title: PropTypes.string,
  drawerIsOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  user: PropTypes.instanceOf(GoogleUser),
  handleLogout: PropTypes.func,
  isEditable: PropTypes.bool,
};

NavContainer.defaultProps = {
  closeDrawer: () => { },
  title: '',
  drawerIsOpen: false,
  toggleDrawer: () => { },
  user: undefined,
  handleLogout: () => { },
  isEditable: false,
};

export default NavContainer;
