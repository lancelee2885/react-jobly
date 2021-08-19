import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./api";
import UserContext from "./UserContext";

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

  /** If there are user credentials in local storage, use those to log in
   * that user. This is meant to be called on page load, just once.
   */
  useEffect(function checkForRememberedUser() {
    console.log("checkForRememberedUser");
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      JoblyApi.token = t;
    };
  }, []);

  /**
   * Updates currUser whenever token changes
   */
  useEffect(
    function updateCurrUserOnTokenChange() {
      async function updateCurrUser() {
        if (token) {
          const { username } = jwt.decode(token);
          const user = await JoblyApi.getUserInfo(username);
          setCurrUser(user);
          localStorage.setItem("token", token);
        } //TODO: else ... checkForRememberedUser ...
      }
      updateCurrUser();
    },
    [token]
  );

  /**
   * Calls JoblyApi logIn to provide a token and update state
   */
  async function handleLogIn(credentials) {
    console.log("handleLogIn");
    const token = await JoblyApi.logIn(credentials);
    setToken(token);
  }

  /**
   * Calls JoblyApi signUp to provide a token and update state
   */
  async function handleSignUp(userInfo) {
    console.log("handleSignUp");
    const token = await JoblyApi.signUp(userInfo);
    setToken(token);
  }

  /**
   * Reset states
   */
  function handleLogOut() {
    console.log("handleLogOut");
    setToken("");
    setCurrUser(null);
    localStorage.clear();
  }

  return (
    <UserContext.Provider value={currUser}>
      <div className="App">
        <BrowserRouter>
          <NavBar currUser={currUser} handleLogOut={handleLogOut} />
          <Routes
            handleLogIn={handleLogIn}
            handleSignUp={handleSignUp}
          />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
