import CompanyCard from "./CompanyCard"

function CompanyList() {
  console.log("CompanyList Renders");
  return (
    <div className="CompanyList">
      This is CompanyList
      <CompanyCard />
    </div>
  )
}

export default CompanyList