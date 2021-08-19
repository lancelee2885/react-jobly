import React, { useEffect, useState, useContext } from "react";
import {useParams, useHistory} from "react-router-dom";
import JobList from "./JobList";
import JoblyApi from "./api";
import UserContext from "./UserContext";

/** Company: renders a page with company information and JobList of the company
 *
 *  States:
 *    - company: an object with company info -> {handle, name, description, numEmployees, logoUrl}
 *
 *  (App -> Company -> JobList)
 */

function Company() {
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
  }, []);

  if (!currUser) {
    history.push("/login");
  } 

  return (
    <div className="Company">
      <h2>{company.name}</h2>
      <h4>{company.description}</h4>
      <JobList jobs={company.jobs}/>
    </div>
  );
}

export default Company;
