import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)

  //Aquí obtenemos las coordenadas de la API del navegador
  //y las montamos en un estado

  const success = (pos) => {
    const newCoords= {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords) //aquí ser mandó al estado
  }

  const newCallAPISearch = (cityName) =>{
    const API_KEY = "55b6d92bbb44843ea6bb997ca03f6eab"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
    .then(res => setWeather(res.data))
    .catch(err => alert("Place not found. Try again."))
  }

const changeUnitTemperature = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //-------Petición de datos a la API
  //del clima

  useEffect(() => {
    if (coords) {
      const API_KEY = "55b6d92bbb44843ea6bb997ca03f6eab"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
      .then(res => {
        const tempKelvin = res.data.main.temp
        const tempCelsius = (tempKelvin - 273.15).toFixed(2)
        const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(2)
        const newTemperature = {
          celsius: tempCelsius,
          fahrenheit: tempFahrenheit
        }
        setTemperature(newTemperature)
        setWeather(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        weather ? (<WeatherCard 
                  weather={weather} 
                  temperature={temperature}
                  changeUnitTemperature={changeUnitTemperature}
                  isCelsius={isCelsius}
                  newCallAPISearch={newCallAPISearch}
                  />
                  ) : <p> Loading...</p>
      }
      </div>
  )
}

export default App
