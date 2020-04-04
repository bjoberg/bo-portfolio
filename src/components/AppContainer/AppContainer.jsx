import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import AppContainerStyles from './AppContainer.styles';
import ActionBar from '../ActionBar/ActionBar';
import User from '../../models/User';

const useStyles = makeStyles(AppContainerStyles);

const AppContainer = (props) => {
  const classes = useStyles();
  const { children, user, actionBarOptions } = props;

  const handleLogin = () => { window.location.href = '/api/login'; };
  const handleLogout = () => { window.location.href = '/api/logout'; };

  return (
    <Fragment>
      <ActionBar
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        {...actionBarOptions}
      />
      <div className={classes.toolbar} />
      <main>{children}</main>
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
