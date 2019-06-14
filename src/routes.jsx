import React from 'react';
import { Switch, Route} from 'react-router-dom'
import { DashboardPage } from './pages'

const Routes = () => (
  <Switch>
    <Route exact path="/dashboard" component={DashboardPage} />
  </Switch>
);

export default Routes;