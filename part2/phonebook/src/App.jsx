import { useState } from 'react'

const Filter = (props) => {
  const handleSearchChange = (event) => {
    props.setNewSearch(event.target.value)
  }

  return(
    <div>filter shown with <input value={props.newSearch}onChange={handleSearchChange}/></div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addInformation}>
        <div>name: <input value={props.newName}onChange={props.handleNameChange}/></div>
        <div>number: <input value={props.newNumber}onChange={props.handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
    </form>
  )
}

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addInformation = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }   
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} setNewSearch={setNewSearch}/>

      <h3>Add a new</h3>

      <PersonForm 
      addInformation={addInformation}
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newSearch={newSearch}/>

    </div>
  )
} 

export default App