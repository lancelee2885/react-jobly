import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import CompaniesPage from './CompaniesPage';
import Company from './Company';
import JobsPage from './JobsPage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';

// props.children for public/private routes

function Routes({ handleLogIn, handleSignUp, handleUpdate, handleApply }) {

  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/companies"><CompaniesPage /></Route>
      <Route exact path="/companies/:handle"><Company handleApply={handleApply}/></Route>
      <Route exact path="/jobs"><JobsPage handleApply={handleApply}/></Route>
      <Route exact path="/login"><LoginForm handleLogIn={handleLogIn} /></Route>
      <Route exact path="/signup"><SignupForm handleSignUp={handleSignUp}/></Route>
      <Route exact path="/profile"><ProfileForm handleUpdate={handleUpdate}/></Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;