import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ClickAwayListener } from '@material-ui/core';

import NavigationDrawer from '../NavigationDrawer';
import AppContainerStyles from './AppContainer.styles';
import ActionBar from '../ActionBar/ActionBar';
import { PersonalData } from '../../constants';

const useStyles = makeStyles(AppContainerStyles);

const AppContainer = (props) => {
  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { children, actionBarOptions, title } = props;

  const openDrawer = () => setDrawerIsOpen(true);
  const closeDrawer = () => setDrawerIsOpen(false);
  const handleLogin = () => { window.location.href = '/api/login'; };
  const handleLogout = () => { window.location.href = '/api/logout'; };

  return (
    <Fragment>
      <ClickAwayListener onClickAway={closeDrawer}>
        {/* This div is needed because the ClickAwayListener needs a ref to bind to */}
        <div>
          <ActionBar
            handleLogout={handleLogout}
            handleLogin={handleLogin}
            handleNav={openDrawer}
            {...actionBarOptions}
          />
          <NavigationDrawer
            title={title}
            email={PersonalData.email}
            items={actionBarOptions.routes}
            isOpen={drawerIsOpen}
            handleClose={closeDrawer}
          />
          <div className={classes.toolbar} />
          <main>{children}</main>
        </div>
      </ClickAwayListener>
    </Fragment>
  );
};

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  actionBarOptions: PropTypes.object,
};

AppContainer.defaultProps = {
  title: '',
  actionBarOptions: undefined,
};

export default AppContainer;
