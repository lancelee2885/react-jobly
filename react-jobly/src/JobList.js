import React from "react";
import Job from "./Job";

/** JobList: render a list of Job
 * 
 *  Props:
 *    - jobs: an array of jobs [{id, title, salary, equity}, ...]
 * 
 *  (JobsPage -> JobList -> Job)
 */
function JobList({ jobs }) {
  console.log("JobList Renders");

  return (
    <div className="JobList">
     {jobs.map(j => (
       <Job key={j.id} job={j}/>
     ))}
    </div>
  );
}

export default JobList;
