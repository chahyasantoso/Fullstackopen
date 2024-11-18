import axios from 'axios'
const weather_API_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_API_KEY

const getWeather = (city) => {
  return axios.get(`${weather_API_URL}/weather?q=${city}&units=metric&APPID=${API_KEY}`)
    .then(response => response.data)
}

export default { getWeather }