import { useState, useEffect } from 'react'
import weatherService from './services/weather'

const Weather = ({city}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeather(city)
      .then(weatherData => {
        //console.log(weatherData)
        setWeather({
          temperature: weatherData.main.temp,
          iconURL: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
          windSpeed: weatherData.wind.speed
        })
      })
  }, [city])

  if (weather === null) {
    return <div>Loading weather ...</div>
  }

  return (
    <>
      <div>Temperature {weather.temperature} Celcius</div>
      <div><img src={weather.iconURL} /></div>
      <div>Wind {weather.windSpeed} m/s</div>
    </>
  )
}

export default Weather