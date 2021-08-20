import React from "react";
import Job from "./Job";

/** JobList: render a list of Job
 * 
 *  Props:
 *    - jobs: an array of jobs [{id, title, salary, equity}, ...]
 *    - handleApply: function rec.d from parent passing down to child component
 * 
 *  (JobsPage -> JobList -> Job)
 */
function JobList({ jobs, handleApply, handleUnApply }) {
  console.log("JobList Renders");

  return (
    <div className="JobList card-columns" style={{margin: "auto 5rem"}}>
     {jobs.map(j => (
       <Job 
        handleApply={handleApply}
        handleUnApply={handleUnApply}
        key={j.id} 
        job={j}
      />
     ))}
    </div>
  );
}

export default JobList;
