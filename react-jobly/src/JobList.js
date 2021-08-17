import Job from "./Job"

function JobList() {
  console.log("JobList Renders");
  return (
    <div className="JobList">
      This is JobList
      <Job />
    </div>
  )
}

export default JobList