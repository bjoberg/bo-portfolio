import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import EntityDetailsPage from './pages/entity-details/entity-details.page';
import GroupListPage from './pages/group-list/group-list.page';
import ErrorPage from './pages/error/error.page';
import EntityType from './utils/constants';
import ImageListPage from './pages/image-list/image-list.page';
import LoginPage from './pages/login/login.page';
import HomePage from './pages/home/home.page';
import GroupPage from './pages/group/group.page';

const Routes = (props) => {
  const { openSnackbar, isEditable } = props;

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={HomePage}
      />
      <Route
        exact
        path="/login"
        component={LoginPage}
      />
      <Route
        exact
        path="/images"
        render={routeProps => (
          <ImageListPage
            {...routeProps}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        exact
        path="/image"
        render={routeProps => (
          <EntityDetailsPage
            {...routeProps}
            entityType={EntityType.IMAGE}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        path="/image/:id"
        render={routeProps => (
          <EntityDetailsPage
            {...routeProps}
            entityType={EntityType.IMAGE}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route exact path="/groups" component={GroupListPage} />
      <Route
        exact
        path="/group"
        render={routeProps => (
          <EntityDetailsPage
            {...routeProps}
            entityType={EntityType.GROUP}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        path="/group/:id"
        render={routeProps => (
          <GroupPage
            {...routeProps}
            isEditable={isEditable}
          />
        )}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
};

Routes.propTypes = {
  openSnackbar: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
};

Routes.defaultProps = {
  isEditable: false,
};

export default Routes;
