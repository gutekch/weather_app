import React, { useState, useEffect, useCallback } from "react";
import './Weather.css';

const Weather = ({ city, coordinates }) => {
  const { lat, lon } = coordinates;
  const API_KEY = "5f95eb9d5b53dc4d8e92a5cbc32e1ad5";
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState('');
  const [photoErr, setPhotoErr] = useState('');

  const getWeather = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        throw new Error(data.message || "City not found");
      }
    } catch (error) {
      setError(error.message);
    }
  }, [lat, lon, API_KEY]);

  const getPhoto = useCallback(async () => {
    try {
      const weatherDescription = weather?.weather?.[0]?.description || '';
      const response = await fetch(`http://localhost:3001/random_photo?city=${city}&weather=${encodeURIComponent(weatherDescription)}`);
      const data = await response.json();
      if (response.ok) {
        setPhoto(data.urls.regular);
      } else {
        throw new Error(data.message || "photo error");
      }
    } catch (error) {
      setPhotoErr(error.message);
    }
  }, [city, weather]);

  useEffect(() => {
    if (lat && lon) {
      getWeather();
    }
  }, [lat, lon, getWeather]);

  useEffect(() => {
    if (city && weather) {
      getPhoto();
    }
  }, [city, weather, getPhoto]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (photoErr) {
    return <div>Error loading photo: {photoErr}</div>;
  }

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  const temperature = weather.main?.temp || '';
  const description = weather.weather?.[0]?.description || '';

  return (
    <div className="weather-container">
      {photo && <div className="weather-background" style={{ backgroundImage: `url(${photo})` }}></div>}
      <div className="weather-info">
        <h1>City: {city}</h1>
        <h2>Temperature: {temperature} °C</h2>
        <h3>Weather: {description}</h3>
      </div>
    </div>
  );
};

export default Weather;