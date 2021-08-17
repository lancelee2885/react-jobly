import SearchForm from "./SearchForm"
import JobList from "./JobList"

function JobsPage() {
  console.log("JobsPage Renders");
  return (
    <div className="JobsPage">
      This is JobsPage
      <JobList />
      <SearchForm />
    </div>
  )
}

export default JobsPage