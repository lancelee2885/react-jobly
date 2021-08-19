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

  let { title, salary, equity } = job;
  if (!salary) {
    salary = "Negotiable";
  }
  if (!equity) {
    equity = "0";
  }

  return (
    <div className="Job card bg-secondary mb-3" style={{ maxWidth: "20rem", maxHeight: "10rem" }}>
      <h5 className="card-header">{title}</h5>
      <p className="card-text" style={{ margin: "2%" }}>
        Salary: {salary}
        <br></br>
        Equity: {equity}
        <br></br>
      </p>
      <button type="button" class="btn btn-warning btn-sm">APPLY</button>
    </div>
  )
}

export default Job;
