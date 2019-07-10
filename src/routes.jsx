import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EntityDetailsPage from './pages/entity-details/entity-details.page';
import EntityListPage from './pages/entity-list/entity-list.page';
import ErrorPage from './pages/error/error.page';

const Routes = () => (
  // /dashboard/group => EntityDetailsPage
  // /dashboard/group/:id => EntityDetailsPage

  // /dashboard/tags => EntityListPage
  // /dashboard/tag => EntityDetailsPage
  // /dashboard/tag/:id => EntityDetailsPage

  <Switch>
    <Route
      exact
      path="/dashboard/images"
      component={routeProps => <EntityListPage {...routeProps} type="image" />}
    />
    <Route
      exact
      path="/dashboard/image"
      component={EntityDetailsPage}
    />
    <Route
      path="/dashboard/image/:id"
      component={EntityDetailsPage}
    />
    <Route
      exact
      path="/dashboard/groups"
      component={routeProps => <EntityListPage {...routeProps} type="group" />}
    />
    <Route component={ErrorPage} />
  </Switch>
);

export default Routes;
