import React from "react";
import { Link } from "react-router-dom";

/** CompanyCard: renders a company card with its information
 *
 * Props:
 *  - company: an object of company information -> {handle, name, description, numEmployees, logoUrl}
 * 
 * (CompanyList -> ComapanyCard)
 */

function CompanyCard({ company }) {
  console.log("CompanyCard Renders");

  const {handle, name, description} = company;

  return (
    <Link to={`/companies/${handle}`}>
      <div className="CompanyCard">
        <h3>{name}</h3>
        <h5>{description}</h5>
      </div>
    </Link>
  );
}

export default CompanyCard;
