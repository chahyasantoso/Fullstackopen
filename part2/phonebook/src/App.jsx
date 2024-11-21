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

  useEffect(() => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
      .catch(error => {
        console.log(error)
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

  const clearFormEntries = () => {
    setNewName('')
    setnewNumber('')
  }

  const handleNameChange = (e) =>setNewName(e.target.value)
  const handleNumberChange = (e) => setnewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const existingPerson = persons.find(({name}) => name.toLowerCase() === newName.toLowerCase())
    if (!existingPerson) {
      personService.create({name: newName, number: newNumber})
        .then(addedPerson => {
          showNotification(`Added ${addedPerson.name}`)
          setPersons([...persons, addedPerson])
          clearFormEntries()
        })
        .catch(error => {
          let message = error.response.data.error || error.message
          showNotification(`Error: ${message}`, 'error')
          clearFormEntries()
        })
      return
    }

    const replaceOK = confirm(`${existingPerson.name} is already added to phonebook, replace the old number with the new one?`)
    if (replaceOK) {
      personService.updateById(existingPerson.id, {...existingPerson, number: newNumber})
        .then(updatedPerson => {
          showNotification(`Replaced old number of ${updatedPerson.name}`)
          setPersons(persons.map((person) => person.id === updatedPerson.id ? updatedPerson : person))
          clearFormEntries()
        })
        .catch(error => {
          switch (error.response.status) {
            case 404:
              showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error')
              setPersons(persons.filter((person) => person.id !== existingPerson.id))
              clearFormEntries()
              break
            default:
              let message = error.response.data.error || error.message
              showNotification(`Error: ${message}`, 'error')
          }
        })
    }
  }

  const handleDelete = (personToDelete) => {
    //console.log(e.target, personToDelete)
    const deleteOK = confirm(`Delete ${personToDelete.name}`)
    if (deleteOK) {
      personService.deleteById(personToDelete.id)
        .then(deletedPerson => {
          showNotification(`Deleted ${personToDelete.name}`)
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
        })
        .catch(error => {
          showNotification(`Information of ${personToDelete.name} has already been removed from server`, 'error')
          setPersons(persons.filter((person) => person.id !== personToDelete.id))
        })
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