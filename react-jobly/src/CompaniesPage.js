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
 */
function CompaniesPage() {
  console.log("CompaniesPage Renders");

  const [companies, setCompanies] = useState(null);
  const [query, setQuery] = useState("");
  const currUser = useContext(UserContext);
  const history = useHistory();

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

  function handleSearch(term) {
    setQuery((q) => term);
  }

  if (!currUser) {
    history.push("/login");
  } 

  return (
    <div className="CompaniesPage">
      {!companies ? (
        <Loading />
      ) : (
        <div>
          <SearchForm handleSearch={handleSearch} />
          <CompanyList companies={companies ? companies : []} />
        </div>
      )}
    </div>
  );
}

export default CompaniesPage;
