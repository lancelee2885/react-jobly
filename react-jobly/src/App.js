import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import Routes from "./Routes";
import Loading from "./Loading";
import NavBar from "./NavBar";
import JoblyApi from "./api";
import UserContext from "./UserContext";

/** App:
 *
 *  States:
 *    - token: encrypted string
 *    - currUser: an object of user's information {username, firstName, lastName, email, isAdmin, applications: [jobId...]}
 *    - infoLoaded: checks if user info has been loaded onto currUser
 */

function App() {
  console.log("App renders");

  const [token, setToken] = useState("");
  const [currUser, setCurrUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  /**
   * Updates currUser whenever token changes or when token found in
   * localStorage
   */
  useEffect(
    function updateCurrUserOnTokenChange() {
      async function updateCurrUser() {
        if (token) {
          const { username } = jwt.decode(token);
          const user = await JoblyApi.getUserInfo(username);
          setCurrUser(user);
          // localStorage.setItem("token", token);
          setInfoLoaded(true);
        } else {
          checkForRememberedUser();
        }
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
    localStorage.setItem("token", token);
  }

  /**
   * Calls JoblyApi signUp to provide a token and update state
   */
  async function handleSignUp(userInfo) {
    console.log("handleSignUp");
    const token = await JoblyApi.signUp(userInfo);
    setToken(token);
    localStorage.setItem("token", token);
  }

  /**
   * Calls JoblyApi updateUser to update user information
   */
  async function handleUpdate(userInfo) {
    console.log("handleUpdate");
    const user = await JoblyApi.updateUser(userInfo, currUser.username);
    setCurrUser(user);
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

  /** If there are user credentials in local storage, use those to log in
   * that user. This is meant to be called on page load, just once.
   */
  function checkForRememberedUser() {
    console.log("checkForRememberedUser");
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      JoblyApi.token = t;
    } else {
      setInfoLoaded(true);
    }
  }

  return (
    <UserContext.Provider value={currUser}>
      <div className="App">
        <BrowserRouter>
          <NavBar currUser={currUser} handleLogOut={handleLogOut} />
          {!infoLoaded
          ? <Loading />
          : <Routes
              handleLogIn={handleLogIn}
              handleSignUp={handleSignUp}
              handleUpdate={handleUpdate}
            />
          }
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
