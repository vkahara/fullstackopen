

const Persons = (props) => {
  const personsToShow = props.persons.filter((person) =>
    (person.name.toLowerCase().includes(props.newSearch.toLowerCase())))

  return(
    personsToShow.map(person =>
      <p key={person.name}>
        {person.name} {person.number} 
        <button id={person.id} name={person.name} onClick={props.remove} type="submit">delete</button>
      </p>
      )
  )
}

export default Persons