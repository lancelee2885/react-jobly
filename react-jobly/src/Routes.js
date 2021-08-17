import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import CompaniesPage from './CompaniesPage';
import CompanyFilter from './CompanyFilter';
import JobsPage from './JobsPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/companies"><CompaniesPage /></Route>
      <Route exact path="/companies/:handle"><CompanyFilter /></Route>
      <Route exact path="/jobs"><JobsPage /></Route>
      <Route exact path="/login"><LoginForm /></Route>
      <Route exact path="/signup"><SignupForm /></Route>
      <Route exact path="/profile"><ProfileForm /></Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;