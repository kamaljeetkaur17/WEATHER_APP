import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [background, setBackground] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://weather-app12-cyan.vercel.app/weather/${city}`);
      setWeatherData(response.data);
      setError('');
      changeBackgroundTheme(response.data.weather[0].main); 
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  const changeBackgroundTheme = (weatherType) => {
    switch (weatherType.toLowerCase()) {
      case 'rain':
        setBackground('https://th.bing.com/th/id/OIP.AVJXCd_GAKMrrk39l5OxTgHaEo?rs=1&pid=ImgDetMain');
        break;
      case 'clear':
        setBackground('https://th.bing.com/th/id/OIP.cUJMV5xpK0w6B_CAPOwL6gHaEo?rs=1&pid=ImgDetMain');
        break;
      case 'clouds':
        setBackground('https://wallpaperaccess.com/full/1462190.jpg');
        break;
      case 'snow':
        setBackground('https://th.bing.com/th/id/OIP.ZCvfTkf2Z7zpPoehdfAKDAHaEL?rs=1&pid=ImgDetMain');
        break;
      case 'thunderstorm':
        setBackground('https://th.bing.com/th/id/OIP.ojme9GTqNCBLhSuj86pT7gHaE8?rs=1&pid=ImgDetMain');
        break;
      default:
        setBackground('https://thumbs.dreamstime.com/b/bright-sunny-day-park-summer-233193654.jpg');
        break;
    }
  };

  useEffect(() => {
    if (background) {
      document.body.style.backgroundImage = `url(${background})`; 
      document.body.style.backgroundSize = 'cover'; 
      document.body.style.backgroundPosition = 'center'; 
    }
  }, [background]);

  return (
    <div id="root">
      <div className="app-main">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp.toFixed(2)} °C</p>
            <p>{weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
