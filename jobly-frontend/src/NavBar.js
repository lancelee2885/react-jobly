import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ currUser, handleLogOut }) {

  function displayCorrectLinks() {
    if (currUser) {
      return (
      <div>
        <ul className="navbar-nav me-auto me-sm-2 navbar-center" >
          <li className="nav-item"><NavLink exact to="/companies" >Companies</NavLink></li>
          <li className="nav-item"><NavLink exact to="/jobs" >Jobs</NavLink></li>
          <li className="nav-item"><NavLink exact to="/applications" >Applications</NavLink></li>
          <li className="nav-item"><NavLink exact to="/profile" >Profile</NavLink></li>
        </ul>
        <ul className="navbar-nav me-auto me-sm-2">
          <li className="nav-item">
            <NavLink exact to="/" onClick={handleLogOut}>Logout</NavLink>
          </li>
        </ul>
      </div>
      );
    } else {
      return (
        <ul className="navbar-nav me-auto justify-content-between">
          <li className="nav-item align-middle">
            <NavLink exact to="/login" >Login</NavLink>
          </li >
          <li className="nav-item align-middle">
            <NavLink exact to="/signup" >Sign Up</NavLink>
          </li>
        </ul>
      );
    }
  }

  return (
    <div className="NavBar">
      <nav className="navbar navbar-expand-sm navbar-light bg-light justify-content-between" >
        <ul className="navbar-nav me-auto">
          <li className="navbar-brand"><NavLink exact to="/">Jobly</NavLink></li>
        </ul>
        {displayCorrectLinks()}
        
      </nav>
    </div>
  );
}

export default NavBar;