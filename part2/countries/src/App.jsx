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

const App = () => {
  const [countries, setCountries] = useState(null)
  const [shownCountry, setShownCountry] = useState(null)
  const [filter, setFilter] = useState('')

  const filteredCountries = filter.trim() === ''
    ? []
    : countries.filter((country) => country.name.common.toLowerCase().includes(filter.trim().toLowerCase()))
 
  //fetch for initial data
  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  //shownCountry depends on filter change and if filteredCountries = 1
  useEffect(() => {
    if (filteredCountries === null || filteredCountries.length !== 1) {
      setShownCountry(null)
      return
    }
    setShownCountry(filteredCountries[0].name.common)
  }, [filter])

  const handleShow = (countryName) => {
    return () => {
      setShownCountry(countryName)
    }
  }

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
      {filteredCountries.length > 10
          ? <div>Too many matches, specify another filter</div>
          : shownCountry === null 
              ? <Countries countries={filteredCountries} onShow={handleShow} />
              : <CountryInfo countryName={shownCountry} />
      }
     
    </>
  )
}

export default App
