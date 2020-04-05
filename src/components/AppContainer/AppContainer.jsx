import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ClickAwayListener } from '@material-ui/core';

import SEO from '../../../next-seo.config';
import NavigationDrawer from '../NavigationDrawer';
import AppContainerStyles from './AppContainer.styles';
import ActionBar from '../ActionBar/ActionBar';
import User from '../../models/User';
import { PersonalData } from '../../constants';

const useStyles = makeStyles(AppContainerStyles);

const AppContainer = (props) => {
  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { children, user, actionBarOptions } = props;

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
            user={user}
            handleLogout={handleLogout}
            handleLogin={handleLogin}
            handleNav={openDrawer}
            {...actionBarOptions}
          />
          <NavigationDrawer
            title={SEO.title}
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
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  actionBarOptions: PropTypes.object,
};

AppContainer.defaultProps = {
  user: undefined,
  actionBarOptions: undefined,
};

export default AppContainer;
