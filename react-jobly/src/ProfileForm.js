import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Error from "./Error";
import UserContext from "./UserContext";

/**
 * Renders a form for users to update their profile
 * 
 * Props:
 *  - handleUpdate: function rec'd from parent that updates states when the form is submited
 */
function ProfileForm({ handleUpdate }) {
  console.log("ProfileForm Renders");

  const currUser = useContext(UserContext) || {};
  const history = useHistory();
  
  if (Object.keys(currUser).length === 0) {
    history.push("/login");
  }
  
  const initialData = {
    firstName: currUser.firstName, 
    lastName: currUser.lastName, 
    email: currUser.email,
    password: "" 
  }
  
  const [formData, setFormData] = useState(initialData);
  const [err, setErr] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

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
      await handleUpdate(formData);
      setIsUpdated(true);
      setFormData(fData => ({
        ...fData,
        password: ""
      }));
      setErr([]);
    } catch(e) {
      setIsUpdated(false);
      setErr(e);
    }
  }

  return (
    <div className="ProfileForm">
      <h1>Profile</h1>
      <p>{"Hi " + currUser.username}</p>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            className="form-control"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={formData.firstName}
            style={{ width: "20rem", margin: "10px auto" }}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            className="form-control"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={formData.lastName}
            style={{ width: "20rem", margin: "10px auto" }}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            className="form-control"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            style={{ width: "20rem", margin: "10px auto" }}
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password: </label>
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

      <Error errors={err}/>
      {isUpdated && <div className="alert alert-dismissible alert-success">Updated Successfuly!</div>}
    </div>
  )
}

export default ProfileForm