import React from "react";
import { NavLink } from "react-router-dom";

/** NavBar: Navigation bar on top of every page
 * 
 * Props:
 *  - currUser: information of current logged in user.
 *  - handleLogOut: function rec'd from parent to clear current user.
 * 
 * @category React Components
 * @component
 */
function NavBar({ currUser, handleLogOut }) {

  /** This function returns JSX with correct Navlinks
   * 
   * @returns {JSX} Navbar items
   */
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