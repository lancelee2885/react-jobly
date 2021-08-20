import React, { useState, useEffect, useContext } from "react";
import SearchForm from "./SearchForm";
import JobList from "./JobList";
import Loading from "./Loading";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";


/** JobsPage:
 *
 * States:
 *  - jobs: an array of jobs [{id, title, salary, equity}, ...]
 *  - query: a string of search term
 *  - handleApply: function rec.d from parent passing down to child component
 * 
 * (App -> JobsPage -> JobList, SearchForm)
 */
function JobsPage({ handleApply, handleUnApply }) {
  console.log("JobsPage Renders");

  const [jobs, setJobs] = useState(null);
  const [query, setQuery] = useState("");
  const currUser = useContext(UserContext);
  const history = useHistory();

  if (!currUser) {
    history.push("/login");
  }

  useEffect(function getJobsOnSearchChange() {
    async function getJobs() {
      const results = await JoblyApi.getAllJobs(query)
      setJobs(results);
    }
    getJobs();
  }, [query]);

  function handleSearch(term) {
    setQuery(term);
  }

  return (
    <div className="JobsPage">
      {!jobs
        ? <Loading />
        : <div>
          <div className="row justify-content-around">
            <h1 style={{ marginTop: "1rem" }}>JOBS</h1>
            <SearchForm handleSearch={handleSearch} />
          </div>
          <hr></hr>
          <JobList 
            handleApply={handleApply} 
            handleUnApply={handleUnApply} 
            jobs={jobs ? jobs : []}
          />
        </div>
      }
    </div>
  );
}

export default JobsPage;
