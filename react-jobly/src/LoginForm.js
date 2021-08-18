import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function LoginForm({ handleLogIn }) {
  console.log("LoginForm Renders");

  const [formData, setFormData] = useState({username: "", password:""});
  const history = useHistory();

  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogIn(formData);
    history.push("/companies");
  }
  
  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <input type="Submit" value="Submit" />
      </form>
    </div>
  )
}

export default LoginForm