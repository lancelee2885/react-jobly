import React, { useState, useEffect, useContext } from "react";
import SearchForm from "./SearchForm";
import CompanyList from "./CompanyList";
import Loading from "./Loading";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";

/** CompaniesPage:
 *
 * States:
 *  - companies: an array of companies -> [{handle, name, description, numEmployees, logoUrl}, ...]
 *  - query: string of search term
 *
 * (App -> CompaniesPage -> CompanyList, SearchForm)
 * @category React Components
 * @component
 */
function CompaniesPage() {
  console.log("CompaniesPage Renders");

  const [companies, setCompanies] = useState(null);
  const [query, setQuery] = useState("");
  const currUser = useContext(UserContext);
  const history = useHistory();

  if (!currUser) {
    history.push("/login");
  } 

  useEffect(
    function getCompaniesOnSearchChange() {
      async function getCompanies() {
        const results = await JoblyApi.getAllCompanies(query);
        setCompanies((c) => results);
      }
      getCompanies();
    },
    [query]
  );

  /** This function changes 'query' state and would be passing down to children components
   * 
   * @param {String} term 
   */
  function handleSearch(term) {
    setQuery(term);
  }

  return (
    <div className="CompaniesPage">
      {!companies ? (
        <Loading />
      ) : (
        <div>
          <div className="row justify-content-around">
            <h1 style={{marginTop:"1rem"}}> Companies </h1>
            <SearchForm handleSearch={handleSearch} />
          </div>
          <hr></hr>
          <CompanyList companies={companies ? companies : []} />
        </div>
      )}
    </div>
  );
}

export default CompaniesPage;
