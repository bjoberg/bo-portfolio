import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import GroupListPage from './pages/group-list/group-list.page';
import ErrorPage from './pages/error/error.page';
import ImageListPage from './pages/image-list/image-list.page';
import LoginPage from './pages/login/login.page';
import HomePage from './pages/home/home.page';
import GroupPage from './pages/group/group.page';
import GoogleUser from './models/google-user.model';

const Routes = (props) => {
  const { openSnackbar, toggleNavContainer, isEditable, user, handleLogout } = props;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (<HomePage {...routeProps} />);
        }}
      />
      <Route
        exact
        path="/login"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (<LoginPage {...routeProps} />);
        }}
      />
      <Route
        exact
        path="/images"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <ImageListPage
              {...routeProps}
              openSnackbar={openSnackbar}
            />
          );
        }}
      />
      <Route
        exact
        path="/groups"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <GroupListPage
              {...routeProps}
              isEditable={isEditable}
            />
          );
        }}
      />
      <Route
        path="/group/:id"
        render={(routeProps) => {
          toggleNavContainer(false);
          return (
            <GroupPage
              {...routeProps}
              openSnackbar={openSnackbar}
              isEditable={isEditable}
              user={user}
              handleLogout={handleLogout}
            />
          );
        }}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
};

Routes.propTypes = {
  openSnackbar: PropTypes.func.isRequired,
  toggleNavContainer: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
  user: PropTypes.instanceOf(GoogleUser),
  handleLogout: PropTypes.func
};

Routes.defaultProps = {
  isEditable: false,
  user: undefined,
  handleLogout: () => { }
};

export default Routes;
