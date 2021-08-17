import React from "react";

/** Job: render single job card
 *
 * Props:
 *  - job: an object of job information
 * 
 * (JobList -> Job)
 */
function Job({ job }) {
  console.log("Job Renders");

  const {title, salary, equity} = job;
  return (
    <div className="Job">
      <h4>{title}</h4>
      <small>Salary: {salary}</small>
      <small>Equity: {equity}</small>
    </div>
  )
}

export default Job;
