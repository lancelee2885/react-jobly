import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ currUser, handleLogOut }) {

  function displayCorrectLinks() {
    if (currUser) {
      return (
        <NavLink exact to="/" onClick={handleLogOut}>Logout</NavLink>
      );
    } else {
      return (
        <span>
          <NavLink exact to="/login">Login</NavLink>
          <NavLink exact to="/signup">Sign Up</NavLink>
        </span>
      );
    }
  }

  return (
    <nav>
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink exact to="/companies">Companies</NavLink>
      <NavLink exact to="/jobs">Jobs</NavLink>
      <NavLink exact to="/profile">Profile</NavLink>
      {displayCorrectLinks()}
    </nav>
  );
}

export default NavBar;