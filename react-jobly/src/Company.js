import React, { useEffect, useState, useContext } from "react";
import {useParams, useHistory} from "react-router-dom";
import JobList from "./JobList";
import JoblyApi from "./api";
import UserContext from "./UserContext";

/** Company: renders a page with company information and JobList of the company
 *
 *  States:
 *    - company: an object with company info -> {handle, name, description, numEmployees, logoUrl}
 *    - handleApply: function rec.d from parent passing down to child component
 *
 *  (App -> Company -> JobList)
 */

function Company({ handleApply , handleUnApply }) {
  console.log("Company Renders");

  const [company, setCompany] = useState({ jobs: [] });
  const history = useHistory();
  const currUser = useContext(UserContext);

  const {handle} = useParams();

  useEffect(function getCompanyOnParamsChange() {
    async function getCompanyInfo() {
      const company = await JoblyApi.getCompany(handle);
      setCompany((c) => company);
    }
    getCompanyInfo();
  }, [handle]);

  if (!currUser) {
    history.push("/login");
  } 

  return (
    <div className="Company" style={{ textAlign: "center", margin: "auto 5rem" }}>
      <h2>{company.name}</h2>
      <hr style={{ width: "50%" }}></hr>
      <h4>{company.description}</h4>
      <hr style={{ width: "50%" }}></hr>
      <h4> Available Jobs </h4>
      <JobList 
        handleApply={handleApply} 
        handleUnApply={handleUnApply}
        jobs={company.jobs} 
      />
    </div>
  );
}

export default Company;
