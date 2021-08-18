import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "./Error";

/**
 * Renders a form for users to log in
 * 
 * Props:
 *  - handleLogIn: function rec'd from parent that updates states when the form is submited
 */
function LoginForm({ handleLogIn }) {
  console.log("LoginForm Renders");
  
  const initialData = {username: "", password:""};
  const [formData, setFormData] = useState(initialData);
  const [err, setErr] = useState([]);
  const history = useHistory();


  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleLogIn(formData);
      history.push("/companies");
    } catch (e) {
      setErr(e);
    }
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
      <Error errors={err} />
    </div>
  )
}

export default LoginForm