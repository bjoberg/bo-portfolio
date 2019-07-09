import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/dashboard.page';
import EntityListPage from './pages/entity-list/entity-list.page';
import ErrorPage from './pages/error/error.page';

const Routes = () => (
  // /dashboard/images => EntityListPage
  // /dashboard/image => EntityDetailsPage
  // /dashboard/image/:id => EntityDetailsPage

  // /dashboard/groups => EntityListPage
  // /dashboard/group => EntityDetailsPage
  // /dashboard/group/:id => EntityDetailsPage

  // /dashboard/tags => EntityListPage
  // /dashboard/tag => EntityDetailsPage
  // /dashboard/tag/:id => EntityDetailsPage

  <Switch>
    <Route
      exact
      path="/dashboard/image"
      component={DashboardPage}
    />
    <Route
      exact
      path="/dashboard/images"
      component={EntityListPage}
    />
    <Route
      path="/dashboard/image/:id"
      component={DashboardPage}
    />
    <Route component={ErrorPage} />
  </Switch>
);

export default Routes;
