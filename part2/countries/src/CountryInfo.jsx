import { useState, useEffect } from 'react'
import Weather from './Weather'
import countryService from './services/countries'

const CountryInfo = ({countryName}) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    //console.log('Country info of', countryName)
    countryService.getCountry(countryName)
      .then(countryData => {
        setCountry(countryData)
      })
  }, [countryName])

  if (country === null) {
    return <div>Loading country data ...</div>
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map((lang) => <li key={lang[0]} >{lang[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h3>Weather in {country.capital[0]}</h3>
      <Weather city={country.capital[0]} />
    </>
  )
}

export default CountryInfo