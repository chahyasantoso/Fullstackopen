import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const URL = 'http://localhost:3001/persons'

  useEffect(() => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

  const filteredPersons = filter.trim() === '' 
    ? persons
    : persons.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (e) =>setNewName(e.target.value)
  const handleNumberChange = (e) => setnewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName.trim() === '') {
      return
    }
    const newPerson = { 
      name: newName, 
      number: newNumber, 
      id: `id-${newName}` 
    }
    const index = persons.findIndex(({name}) => name.toLowerCase() === newPerson.name.toLowerCase())
    if (index == -1) {
      personService
        .create(newPerson)
        .then(addedPerson => {
          setPersons([...persons, addedPerson])
          setNewName('')
          setnewNumber('')
        })
      return
    }
    const replaceOK = confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
    if (replaceOK) {
      personService
        .updateById(newPerson.id, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map((person) => person.id === updatedPerson.id ? updatedPerson : person))
          setNewName('')
          setnewNumber('')
        })
    }
  }

  const handleDelete = (personToDelete) => {
    return (e) => {
      //console.log(e.target, personToDelete)
      const deleteOK = confirm(`Delete ${personToDelete.name}`)
      if (deleteOK) {
        personService.deleteById(personToDelete.id)
          .then(deletedPerson => {
            setPersons(persons.filter((person) => person.id !== deletedPerson.id))
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filter} onFilter={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} 
        onSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App