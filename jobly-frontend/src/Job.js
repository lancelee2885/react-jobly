import React, { useContext, useState } from "react";
import UserContext from "./UserContext"

/** Job: render single job card
 *
 * Props:
 *  - job: an object of job information
 *  - handleApply: function rec.d from parent to update application status
 *  - handleUnApply: function rec.d from parent to unapply to a job app 
 *
 * States: 
 *  - isApplied: check if current job is applied by current user
 * 
 * (JobList -> Job)
 */
function Job({ job, handleApply, handleUnApply }) {
  console.log("Job Renders");

  const currUser = useContext(UserContext);
  const [isApplied, setIsApplied] = useState(currUser.applications.has(job.id));

  let { title, salary, equity } = job;
  if (!salary) {
    salary = "Negotiable";
  }
  if (!equity) {
    equity = "0";
  }

  async function toggleApply() {
    if (!isApplied) {
      await handleApply(job.id);
      setIsApplied(true);
    } else {
      await handleUnApply(job.id);
      setIsApplied(false);
    }
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
      <button
        type="button"
        className={`btn btn-warning btn-sm ${isApplied ? "disabled" : ""} `}
        onClick={toggleApply}>{isApplied ? "APPLIED" : "APPLY"}
      </button>
    </div>
  )
}

export default Job;
