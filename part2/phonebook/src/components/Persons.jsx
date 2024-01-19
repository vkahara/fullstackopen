const Persons = (props) => {
    const personsToShow = props.persons.filter((person) =>
     (person.name.toLowerCase().includes(props.newSearch.toLowerCase())))
  
    return(
      personsToShow.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        )
    )
  }

  export default Persons