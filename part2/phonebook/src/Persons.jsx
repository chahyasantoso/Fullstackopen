const Persons = ({persons}) => {
  return (
    <>
    {
      persons.map(
      ({name, number, id}) => <Person key={id} name={name} number={number} />
      )
    }
    </>
  )
}
  
const Person = ({name, number}) => {
  return (
    <>
      <div>{name} {number}</div>
    </>
  )
}

export default Persons