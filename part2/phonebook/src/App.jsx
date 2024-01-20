import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [userAddMessage, setUserAddMessage] = useState(null)
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addInformation = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some((person) => person.name === newName)) {
      const updatedToBe = persons.find((person) => person.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(updatedToBe.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatedToBe.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setUserAddMessage(
              `Changed  ${returnedPerson.name} number to ${returnedPerson.number}`
            )
            setTimeout(() => {
              setUserAddMessage(null)
            }, 3000)
          })
      } 
    } else {
    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setUserAddMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setUserAddMessage(null)
          }, 3000)
        })    
      }
  }

  const deleteInformation = person => {
    if (window.confirm(`delete ${person.currentTarget.name}?`)) {
    const personId = person.currentTarget.id
    personService
      .remove(personId)
        .then(() => {
          setPersons(persons.filter(n => n.id !== personId))
        }) 
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

      <Notification message={userAddMessage}/>

      <Filter newSearch={newSearch} setNewSearch={setNewSearch}/>

      <h3>Add a new</h3>

      <PersonForm 
      addInformation={addInformation}
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newSearch={newSearch} remove={deleteInformation}/>

    </div>
  )
} 

export default App