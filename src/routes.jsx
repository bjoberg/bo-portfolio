import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import EntityDetailsPage from './pages/entity-details/entity-details.page';
import EntityListPage from './pages/entity-list/entity-list.page';
import ErrorPage from './pages/error/error.page';
import EntityType from './utils/enums/entity-type.enum';

const Routes = (props) => {
// /dashboard/tags => EntityListPage
// /dashboard/tag => EntityDetailsPage
// /dashboard/tag/:id => EntityDetailsPage
  const { openSnackbar } = props;

  return (
    <Switch>
      <Route
        exact
        path="/dashboard/images"
        component={routeProps => (
          <EntityListPage
            {...routeProps}
            entityType={EntityType.IMAGE}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        exact
        path="/dashboard/image"
        component={routeProps => (
          <EntityDetailsPage
            {...routeProps}
            entityType={EntityType.IMAGE}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        path="/dashboard/image/:id"
        component={routeProps => (
          <EntityDetailsPage
            {...routeProps}
            entityType={EntityType.IMAGE}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        exact
        path="/dashboard/groups"
        component={routeProps => (
          <EntityListPage
            {...routeProps}
            entityType={EntityType.GROUP}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        exact
        path="/dashboard/group"
        component={routeProps => (
          <EntityDetailsPage
            {...routeProps}
            entityType={EntityType.GROUP}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route
        path="/dashboard/group/:id"
        component={routeProps => (
          <EntityDetailsPage
            {...routeProps}
            entityType={EntityType.GROUP}
            openSnackbar={openSnackbar}
          />
        )}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
};
Routes.propTypes = {
  openSnackbar: PropTypes.func.isRequired,
};

export default Routes;
