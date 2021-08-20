import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import CompaniesPage from './CompaniesPage';
import Company from './Company';
import JobsPage from './JobsPage';
import JobApplications from './JobApplications';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';

function Routes({ handleLogIn, handleSignUp, handleUpdate, handleApply, handleUnApply }) {

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/companies">
        <CompaniesPage />
      </Route>
      <Route exact path="/companies/:handle">
        <Company 
          handleApply={handleApply}
          handleUnApply={handleUnApply}
        />
      </Route>
      <Route exact path="/jobs">
        <JobsPage 
          handleApply={handleApply}
          handleUnApply={handleUnApply}
        />
      </Route>
      <Route exact path="/applications">
        <JobApplications 
          handleApply={handleApply}
          handleUnApply={handleUnApply}
        />
      </Route>
      <Route exact path="/login">
        <LoginForm handleLogIn={handleLogIn} />
      </Route>
      <Route exact path="/signup">
        <SignupForm handleSignUp={handleSignUp}/>
      </Route>
      <Route exact path="/profile">
        <ProfileForm handleUpdate={handleUpdate}/>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;