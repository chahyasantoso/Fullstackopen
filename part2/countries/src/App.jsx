import { useState, useEffect } from 'react'
import Countries from './Countries'
import CountryInfo from './CountryInfo'
import countryService from './services/countries'


const Filter = ({filter, onChange}) => {
  return (
    <>
      <div>Find countries <input value={filter} onChange={onChange} /></div>
    </>
  )
}

const Result = ({result, onShow}) => {
  if (result.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (result.length === 1) {
    return <CountryInfo countryName={result[0].name.common} />
  }

  return <Countries countries={result} onShow={onShow} />
}


const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  const filteredCountries = filter === '' 
    ? []
    : countries.filter((country) => country.name.common.toLowerCase().includes(filter.trim().toLowerCase()))
 
  //fetch for initial data
  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (e) => {
    const filterValue = e.target.value
    setFilter(filterValue)
  }

  if (countries === null) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <Filter filter={filter} onChange={handleFilterChange} />
      <Result result={filteredCountries} onShow={setFilter} />     
    </>
  )
}

export default App
