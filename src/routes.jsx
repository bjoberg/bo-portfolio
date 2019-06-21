import React from 'react';
import { Switch, Route} from 'react-router-dom'
import { DashboardPage } from './pages'

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/dashboard/image"
      component={DashboardPage} />
    <Route
      path="/dashboard/image/:id"
      component={DashboardPage} />
  </Switch>
);

export default Routes;