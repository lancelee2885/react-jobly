import React, { useState } from "react";

/** SearchForm: renders a form for search a term
 * 
 * Props:
 *  - handleSearch: function rec'd from parent components
 * 
 * (CompaniesPage, JobsPage -> SearchForm)
 */
function SearchForm({ handleSearch }) {
  console.log("SearchForm Renders");

  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(term);
  }

  function handleClear(evt) {
    evt.preventDefault();
    handleSearch("");
    setTerm("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={handleClear}>x</button>
      <input value={term} onChange={handleChange} />
      <button>Search!</button>
    </form>
  );
}

export default SearchForm;
