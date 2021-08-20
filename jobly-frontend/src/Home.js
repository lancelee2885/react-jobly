import React, { useContext } from 'react';
import UserContext from "./UserContext";
import { Link } from "react-router-dom";

function Home() {
  console.log("Home Renders");

  const currUser = useContext(UserContext);

  if (currUser) {
    return (
      <h1 className="Home">
        Welcome Back {currUser.firstName}
      </h1>
    )
  }

  return (
    <div>
      <h3>Jobly</h3>
      <h5>All the jobs in one, convenient place.</h5>
      <Link to="/login">
        <button className="btn btn-info">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn btn-info"style={{marginLeft:"2rem"}}>Sign Up</button>
      </Link>
    </div>
  )
}

export default Home