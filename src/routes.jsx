import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import EntityDetailsPage from './pages/entity-details/entity-details.page';
import EntityListPage from './pages/entity-list/entity-list.page';
import GroupListPage from './pages/group-list/group-list.page';
import ErrorPage from './pages/error/error.page';
import EntityType from './utils/constants';

const Routes = (props) => {
// /dashboard/tags => EntityListPage
// /dashboard/tag => EntityDetailsPage
// /dashboard/tag/:id => EntityDetailsPage
  const { openSnackbar } = props;

  return (
    <Switch>
      <Route
        exact
        path="/images"
        render={routeProps => (
          <EntityListPage
            {...routeProps}
            entityType={EntityType.IMAGE}
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
      <Route
        exact
        path="/groups"
        component={GroupListPage}
        // render={routeProps => (
        //   <EntityListPage
        //     {...routeProps}
        //     entityType={EntityType.GROUP}
        //   />
        // )}
      />
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
