const Persons = ({persons, onDelete}) => {
  return (
    <>
    {
      persons.map(
        (person) => <Person key={person.id} person={person} onDelete={onDelete}  />
      )
    }
    </>
  )
}
  
const Person = ({person, onDelete}) => {
  const {name, number} = person
  return (  
    <>
      <div>
        {name} {number} <button onClick={() => onDelete(person)}>delete</button>
      </div>
    </>
  )
}

export default Persons