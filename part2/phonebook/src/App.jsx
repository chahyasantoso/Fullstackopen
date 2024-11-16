import { useState } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter.trim() === '' 
    ? persons
    : persons.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (e) =>setNewName(e.target.value)
  const handleNumberChange = (e) => setnewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const isPersonExist = (nameToFind) => {
    const index = persons.findIndex(({name}) => name.toLowerCase() === nameToFind.toLowerCase())
    if (index === -1) return false
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isPersonExist(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }])
    setNewName('')
    setnewNumber('')
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App