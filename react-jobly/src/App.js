import './App.css';
import React, { useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from './api';

function App() {
  console.log("App renders");

  const [token, setToken] = useState("");
  const [currUser, setCurrUser] = useState(null);
  const [username, setUsername] = useState("")

  useEffect(function updateCurrUserOnLogInOrSignUp() {
    async function updateCurrUser() {
      const user = await JoblyApi.getUserInfo(username);
      setCurrUser(u => user);
    }
    updateCurrUser();
  }, [token]);

  function updateTokenAndUsername(token, username) {
    console.log('updateTokenAndUsername');
    setUsername(uName => username);
    setToken(t => token);
  }
  
  function handleLogIn(credentials) {
    console.log('handleLogIn');
    async function logIn() {
      const token = await JoblyApi.logIn(credentials);
      updateTokenAndUsername(token, credentials.username);
    }
    logIn();
  }

  function handleSignUp(userInfo) {
    console.log('handleSignUp');
    async function signUp() {
      const token = await JoblyApi.signUp(userInfo);
      updateTokenAndUsername(token, userInfo.username);
    }
    signUp();
  }

  function handleLogOut() {
    setToken(t => "");
    setCurrUser(u => null);
    setUsername(uName => "");
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
