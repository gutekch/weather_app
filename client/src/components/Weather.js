import React, { useState, useEffect } from "react";

const Weather = ({ city, coordinates }) => {
  const { lat, lon } = coordinates;
  const API_KEY = "5f95eb9d5b53dc4d8e92a5cbc32e1ad5";
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWeather = async () => {
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
    };

    getWeather();
  }, [lat, lon, API_KEY]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  // Ensure weather is not null before accessing its properties
  const temperature = weather.main ? weather.main.temp : '';
  const description = weather.weather && weather.weather.length > 0 ? weather.weather[0].description : '';

  return (
    <div>
      <h1>City: {city}</h1>
      <h1>Latitude: {lat}</h1>
      <h1>Longitude: {lon}</h1>
      <h2>Temperature: {temperature} °C</h2>
      <h3>Weather: {description}</h3>
    </div>
  );
};

export default Weather;