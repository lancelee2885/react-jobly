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
      setErr(e);
    }
  }


  return (
    <div className="ProfileForm">
      <h1>Profile</h1>
      <p>{currUser.username}</p>
      {/* <div>
        <label htmlFor="username">Username</label>
        <input
          value={currUser.username}
        />
      </div> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <Error errors={err}/>
      {isUpdated && <div>Updated Successfuly!</div>}
    </div>
  )
}

export default ProfileForm