import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/dashboard.page';
import ImagesListPage from './pages/images-list/images-list.page';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/dashboard/image"
      component={DashboardPage}
    />
    <Route
      path="/dashboard/images"
      component={ImagesListPage}
    />
    <Route
      path="/dashboard/image/:id"
      component={DashboardPage}
    />
  </Switch>
);

export default Routes;
