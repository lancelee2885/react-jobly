import React from "react";
import CompanyCard from "./CompanyCard";

/** CompanyList: render a list of company cards
 *
 * Props:
 *  - companies: an array of companies -> [{handle, name, description, numEmployees, logoUrl}, ...]
 * 
 * (CompaniesPage -> CompanyList -> CompanyCard)
 * @category React Components
 * @component
 */
function CompanyList({ companies }) {
  console.log("CompanyList Renders");
  return (
    <div className="CompanyList card-columns" style={{margin: "auto 5rem"}}>
      {companies.map(c => (
        <CompanyCard key={c.handle} company={c}/>
      ))}
    </div>
  );
}

export default CompanyList;
