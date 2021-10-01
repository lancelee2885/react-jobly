import React, { useState, useContext, useEffect } from "react";
import Loading from "./Loading";
import JobList from "./JobList";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";

/** JobApplications: Renders a list of jobs applied by current user.
 * 
 * Props: 
 *   - handleApply: function rec.d from parent(CompaniesPage) for changing states.
 *   - handleUnApply: function rec.d from parent(CompaniesPage) for changing states.
 * 
 * State:
 *   - jobs: List of jobs, updates current user changes.
 * 
 * @category React Components
 * @component
 */

function JobApplications({ handleApply, handleUnApply }) {
  console.log("JobApplications Renders");

  const [jobs, setJobs] = useState(null);
  const currUser = useContext(UserContext);
  const history = useHistory();

  if (!currUser) {
    history.push("/login");
  }

  useEffect(function getAppliedJobs() {
    async function getJobs() {
      const results = await JoblyApi.getAppliedJobs(currUser.username);
      setJobs(results);
    }
    getJobs();
  }, [currUser.username]);


  return (
    <div className="JobsApplications">
      {!jobs
        ? <Loading />
        : <div>
          <div className="row justify-content-around">
            <h1 style={{ marginTop: "1rem" }}>APPLIED JOBS</h1>
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

export default JobApplications;