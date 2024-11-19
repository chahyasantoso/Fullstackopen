const Countries = ({countries, onShow}) => {
  return (
      countries.map((country) => <CountryLine key={country.name.common} country={country} onShow={onShow} />)
  )
}

const CountryLine = ({country, onShow}) => {
  return (
    <div>
      {country.name.common} <button onClick={() => onShow(country.name.common)}>show</button>
    </div>
  )
}

export default Countries