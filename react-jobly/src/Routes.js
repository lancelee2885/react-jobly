import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import CompaniesPage from './CompaniesPage';
import Company from './Company';
import JobsPage from './JobsPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';

function Routes({ handleLogIn, handleSignUp }) {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/companies"><CompaniesPage /></Route>
      <Route exact path="/companies/:handle"><Company /></Route>
      <Route exact path="/jobs"><JobsPage /></Route>
      <Route exact path="/login"><LoginForm handleLogIn={handleLogIn} /></Route>
      <Route exact path="/signup"><SignupForm handleSignUp={handleSignUp}/></Route>
      <Route exact path="/profile"><ProfileForm /></Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;