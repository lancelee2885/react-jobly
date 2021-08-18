import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import JobList from "./JobList";
import Loading from "./Loading";
import JoblyApi from "./api";


/** JobsPage:
 *
 * States:
 *  - jobs: an array of jobs [{id, title, salary, equity}, ...]
 *  - query: a string of search term
 * 
 * (App -> JobsPage -> JobList, SearchForm)
 */
function JobsPage() {
  console.log("JobsPage Renders");

  const [jobs, setJobs] = useState(null);
  const [query, setQuery] = useState(""); 

  useEffect(function getJobsOnSearchChange() {
    async function getJobs() {
      const results = await JoblyApi.getAllJobs(query)
      setJobs(j => results);
    }
    getJobs();
  }, [query]);

  function handleSearch(term){
    setQuery(q => term);
  }

  return (
    <div className="JobsPage">
      {!jobs
      ? <Loading />
      : <div>
          <SearchForm handleSearch={handleSearch}/>
          <JobList jobs={jobs ? jobs : []}/>
        </div>
      }
    </div>
  );
}

export default JobsPage;
