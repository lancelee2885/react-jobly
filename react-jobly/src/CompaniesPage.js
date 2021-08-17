import SearchForm from "./SearchForm"
import CompanyList from "./CompanyList"

function CompaniesPage() {
  console.log("CompaniesPage Renders");
  return (
    <div className="CompaniesPage">
      This is CompaniesPage
      <SearchForm />
      <CompanyList />
    </div>
  )
}

export default CompaniesPage