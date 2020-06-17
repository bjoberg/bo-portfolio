import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { makeStyles } from '@material-ui/core/styles';
import { ClickAwayListener } from '@material-ui/core';

import NavigationDrawer from '../NavigationDrawer';
import AppContainerStyles from './AppContainer.styles';
import ActionBar from '../ActionBar/ActionBar';
import { PersonalData } from '../../constants';

const useStyles = makeStyles(AppContainerStyles);
const { publicRuntimeConfig } = getConfig();

const AppContainer = (props) => {
  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { children, actionBarOptions } = props;

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
            title={publicRuntimeConfig.title}
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
  // eslint-disable-next-line react/forbid-prop-types
  actionBarOptions: PropTypes.object,
};

AppContainer.defaultProps = {
  actionBarOptions: undefined,
};

export default AppContainer;
