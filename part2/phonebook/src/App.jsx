import { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
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
    : persons.filter(({name}) => name.toLowerCase().includes(filter.trim().toLowerCase()))

  const showNotification = (text, type = 'success', time = 5000) => {
    setNotification({text, type})
    setTimeout(() => {
      setNotification(null)
    }, time)
  }

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
          showNotification(`Added ${addedPerson.name}`)
        })
      return
    }

    const existingPerson = persons[index]
    const replaceOK = confirm(`${existingPerson.name} is already added to phonebook, replace the old number with the new one?`)
    if (replaceOK) {
      existingPerson.number = newNumber
      personService
        .updateById(existingPerson.id, existingPerson)
        .then(updatedPerson => {
          setPersons(persons.map((person) => person.id === updatedPerson.id ? updatedPerson : person))
          setNewName('')
          setnewNumber('')
          showNotification(`Replaced old number of ${updatedPerson.name}`)
        })
        .catch(error => {
          showNotification(`Information of ${newPerson.name} has already been removed from server`, 'error')
          setPersons(persons.filter((person) => person.id !== newPerson.id))
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
            showNotification(`Deleted ${personToDelete.name}`)
          })
          .catch(error => {
            showNotification(`Information of ${personToDelete.name} has already been removed from server`, 'error')
            setPersons(persons.filter((person) => person.id !== personToDelete.id))
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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