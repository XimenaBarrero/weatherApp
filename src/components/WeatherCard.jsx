import React, { useState } from 'react'

const WeatherCard = ({weather, temperature, 
    isCelsius, changeUnitTemperature, newCallAPISearch}) => {
        const [place, setPlace] = useState("")

        const handleChangePlace = (e) => {
            setPlace(e.target.value)
        }

  return (
    <article className='weatherCard'>
        <h1>Weather App</h1>
        <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
        <section className='weatherCardBody'>
            <div className='weatherImage'>
               <img src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@4x.png`} alt="current-weather-img" />
            </div>
            <ul>
                <li>"{weather.weather[0].description}"</li>
                <li>Wind speed: {weather.wind.speed} m/s</li>
                <li>Clouds: {weather.clouds.all}%</li>
                <li>Pressure: {weather.main.pressure} hPa</li>
            </ul>
        </section>
        <p><b>{isCelsius ? `${temperature.celsius} °C` :  `${temperature.fahrenheit} °F`}</b></p>
        <button className='weatherCardButton' onClick={changeUnitTemperature}>Degrees °F/°C</button>
        <section className='weatherCard-footer'>
        <input 
        type="text" 
        value={place} 
        onChange= {handleChangePlace} 
        />
        <button className='weatherCardButton' onClick={() => newCallAPISearch(place)}>Search</button>
        </section>
    </article>
  )
}

export default WeatherCard