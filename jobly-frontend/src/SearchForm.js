import React, { useState } from "react";
import {debounce} from 'lodash';

/** SearchForm: renders a form for search a term
 * 
 * Props:
 *  - handleSearch: function rec'd from parent components
 * 
 * States:
 *  - term: string of search term
 * 
 * (CompaniesPage, JobsPage -> SearchForm)
 * 
 * @category React Components
 * @component
 */
function SearchForm({ handleSearch }) {
  console.log("SearchForm Renders");

  
  const [term, setTerm] = useState("");

  /**
   *  Changes state upon inputting information on the form.
   */
  function handleChange(evt) {
    setTerm(evt.target.value);
    const search = debounce(handleSearch, 300);
    search(evt.target.value)
  }

  /**
   *  start searching once form is submited
   */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(term);
  }

  return (
    <form onSubmit={handleSubmit} style={{display:"inline-block"}}>
      <input value={term} onChange={handleChange} className="form-control" style={{width:"20rem", display:"inline", margin:"10px auto"}} />
      <button className="btn btn-info" style={{ display:"inline", margin:"10px"}} >Search!</button>
    </form>
  );
}

export default SearchForm;
