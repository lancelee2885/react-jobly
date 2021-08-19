import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Error from "./Error";
import UserContext from "./UserContext";

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
  const currUser = useContext(UserContext);

  if (currUser){
    history.push("/companies");
  }

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
    } catch (e) {
      setErr(e);
    }
  }

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="username"
            id="username"
            onChange={handleChange}
            value={formData.username}
            style={{ width: "20rem", margin: "10px auto" }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
            style={{ width: "20rem", margin: "10px auto" }}
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      <Error errors={err} />
    </div>
  )
}


export default LoginForm