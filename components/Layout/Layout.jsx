import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ActionBar from '../ActionBar/ActionBar';

const Layout = props => {
  const { children, user, actionBarOptions } = props;

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
        handleLogout={actionBarOptions.handleLogout}
      />
      <main>{children}</main>
    </Fragment>
  )
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.shape({
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    nickname: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string
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
    handleLogout: PropTypes.func,
  }),
};

Layout.defaultProps = {
  user: undefined,
  actionBarOptions: undefined
}

export default Layout
