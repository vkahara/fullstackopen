const Filter = (props) => {
    const handleSearchChange = (event) => {
      props.setNewSearch(event.target.value)
    }
  
    return(
      <div>filter shown with <input value={props.newSearch}onChange={handleSearchChange}/></div>
    )
  }

  export default Filter