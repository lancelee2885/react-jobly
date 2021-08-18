import './App.css';
import React, { useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken"

import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from './api';

/** App: 
 * 
 *  States: 
 *    - token: encrypted string
 *    - currUser: an object of user's information {username, firstName, lastName, email, isAdmin, application:[jobId...]}
 */

function App() {
  console.log("App renders");

  const [token, setToken] = useState("");
  const [currUser, setCurrUser] = useState(null);

  /**
   * Updates currUser whenever user logs in or signs up
   */
  useEffect(function updateCurrUserOnLogInOrSignUp() {
    async function updateCurrUser() {
      if (token) {
        const { username } = jwt.decode(token);
        const user = await JoblyApi.getUserInfo(username);
        setCurrUser(user);
      }
    }
    updateCurrUser();
  }, [token]);

  /**
   * Calls JoblyApi logIn to provide a token and update state
   */
  async function handleLogIn(credentials) {
    console.log('handleLogIn');
    const token = await JoblyApi.logIn(credentials);
    setToken(token);
  }

  /**
   * Calls JoblyApi signUp to provide a token and update state
   */
  async function handleSignUp(userInfo) {
    console.log('handleSignUp');
    const token = await JoblyApi.signUp(userInfo);
    setToken(token);
  }

  /**
   * Reset states
   */
  function handleLogOut() {
    setToken("");
    setCurrUser(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar 
          currUser={currUser} 
          handleLogOut={handleLogOut}/>
        <Routes 
          handleLogIn={handleLogIn}
          handleSignUp={handleSignUp}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
