const Course = ({course}) => {
    const {name, parts} = course
    return (
      <>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </>
    )
  }
  
  const Header = ({name}) => <h1>{name}</h1>
  
  const Content = ({parts}) => {
    return (
      <div>
        {
          parts.map(({id, name, exercises}) => <Part key={id} name={name} number={exercises} />)
        }
      </div>
    )
  }
  
  const Part = ({name, number}) => <p>{name} {number}</p>
  
  const Total = ({parts}) => <p>Number of exercises {parts.reduce((a, b) => ({ exercises: a.exercises + b.exercises })).exercises }</p>

  export default Course