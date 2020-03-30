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
        title={actionBarOptions.title}
        navButtonColor={actionBarOptions.navButtonColor}
        actionButtonColor={actionBarOptions.actionButtonColor}
        isDisabled={actionBarOptions.isDisabled}
        elevateOnScroll={actionBarOptions.elevateOnScroll}
        showDelete={actionBarOptions.showDelete}
        showInfo={actionBarOptions.showInfo}
        showAddPhoto={actionBarOptions.showAddPhoto}
        showSave={actionBarOptions.showSave}
        showAddGroup={actionBarOptions.showAddGroup}
        showAvatar={actionBarOptions.showAvatar}
        saveButtonText={actionBarOptions.saveButtonText}
        navButton={actionBarOptions.navButton}
        handleNav={actionBarOptions.handleNav}
        handleDelete={actionBarOptions.handleDelete}
        handleInfo={actionBarOptions.handleInfo}
        handleAddPhoto={actionBarOptions.handleAddPhoto}
        handleAddGroup={actionBarOptions.handleAddGroup}
        handleSave={actionBarOptions.handleSave}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
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
  actionBarOptions: PropTypes.shape({
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
    saveButtonText: PropTypes.string,
    navButton: PropTypes.element,
    handleNav: PropTypes.func,
    handleDelete: PropTypes.func,
    handleInfo: PropTypes.func,
    handleAddPhoto: PropTypes.func,
    handleAddGroup: PropTypes.func,
    handleSave: PropTypes.func,
  }),
};

AppContainer.defaultProps = {
  user: undefined,
  actionBarOptions: undefined,
};

export default AppContainer;
