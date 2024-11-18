const Countries = ({countries, onShow}) => {
  return (
      countries.map((country) => <Country key={country.name.common} country={country} onShow={onShow(country.name.common)} />)
  )
}

const Country = ({country, onShow}) => {
  return (
    <div>
      {country.name.common} <button onClick={onShow}>show</button>
    </div>
  )
}

export default Countries