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

  const { handle, name, description, logoUrl } = company;

  const imgStyle = { width: "2.5rem", height: "2rem"};

  return (
    <Link
      to={`/companies/${handle}`}
      className="card bg-secondary"
      style={{ maxWidth:"20rem" }}
    >
      <div className="CompanyCard card-body">
        <h4 className="card-title"><p>{name}</p><p>{logoUrl && <img className="card-img-top" style={imgStyle} src={logoUrl} alt={name} />}</p></h4>
        <p className="card-text">{description}</p>
      </div>
      
    </Link>
  );
}

export default CompanyCard;
