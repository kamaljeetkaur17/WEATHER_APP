import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://weather-app12-cyan.vercel.app/weather/${city}`);
      setWeatherData(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  // Defining styles as objects
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: weatherData && weatherData.weather[0].icon.includes('d') ? '#e0f7fa' : '#263238',
    transition: 'background-color 0.3s ease',
    color: weatherData && weatherData.weather[0].icon.includes('d') ? 'black' : 'white',
  };

  const weatherBoxStyles = {
    backgroundColor: weatherData && weatherData.weather[0].icon.includes('d') ? 'white' : '#37474f',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    color: weatherData && weatherData.weather[0].icon.includes('d') ? 'black' : 'white',
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #bdbdbd',
    marginBottom: '15px',
    fontSize: '1rem',
  };

  const buttonStyles = {
    padding: '10px 20px',
    backgroundColor: '#0288d1',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const buttonHoverStyles = {
    backgroundColor: '#0277bd',
  };

  const weatherInfoStyles = {
    marginTop: '20px',
  };

  const cityNameStyles = {
    fontSize: '1.5rem',
    marginBottom: '10px',
  };

  const tempStyles = {
    fontSize: '2.5rem',
    marginBottom: '10px',
  };

  const descStyles = {
    fontSize: '1.2rem',
    marginBottom: '20px',
    textTransform: 'capitalize',
  };

  const extraInfoStyles = {
    fontSize: '1rem',
    marginBottom: '5px',
  };

  return (
    <div style={containerStyles}>
      <div style={weatherBoxStyles}>
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyles}
        />
        <button
          onClick={fetchWeather}
          style={{ ...buttonStyles, ':hover': buttonHoverStyles }}
        >
          Get Weather
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {weatherData && (
          <div style={weatherInfoStyles}>
            <h2 style={cityNameStyles}>{weatherData.name}</h2>
            <p style={tempStyles}>{weatherData.main.temp.toFixed(2)} °C</p>
            <p style={descStyles}>{weatherData.weather[0].description}</p>
            <div>
              <p style={extraInfoStyles}>Humidity: {weatherData.main.humidity}%</p>
              <p style={extraInfoStyles}>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;