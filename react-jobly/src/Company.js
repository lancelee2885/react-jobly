import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import JobList from "./JobList";
import JoblyApi from "./api";

/** Company: renders a page with company information and JobList of the company
 *
 *  States:
 *    - company: an object with company info -> {handle, name, description, numEmployees, logoUrl}
 *
 *  (App -> Company -> JobList)
 */

function Company() {
  console.log("Company Renders");

  const [company, setCompany] = useState({});

  const {handle} = useParams();

  useEffect(function getCompanyOnParamsChange() {
    async function getCompanyInfo() {
      const company = await JoblyApi.getCompany(handle);
      setCompany((c) => company);
    }
    getCompanyInfo();
  }, []);

  // use a loading page/component for first render
  return (
    <div className="Company">
      <h2>{company.name}</h2>
      <h4>{company.description}</h4>
      <JobList jobs={company ? company.job : []}/>
    </div>
  );
}

export default Company;
