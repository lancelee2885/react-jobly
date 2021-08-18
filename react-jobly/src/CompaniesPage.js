import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import CompanyList from "./CompanyList";
import Loading from "./Loading"
import JoblyApi from "./api";


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

  useEffect(function getCompaniesOnSearchChange() {
    async function getCompanies() {
      const results = await JoblyApi.getAllCompanies(query);
      setCompanies(c => results);
    }
    getCompanies();
  }, [query]);

  function handleSearch(term){
    // can also pass setter function down to child
    setQuery(q => term);
  }

  return (
    <div className="CompaniesPage">
      {!companies
      ? <Loading />
      : <div>
          <SearchForm handleSearch={handleSearch}/>
          <CompanyList companies={companies ? companies : []}/>
        </div>
      }
    </div>
  );
}

export default CompaniesPage;
