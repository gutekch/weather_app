import React from 'react'

export const Weather = ({city, coordinates}) => {
    const {lat,lon} = coordinates;
    const API_KEY = "5f95eb9d5b53dc4d8e92a5cbc32e1ad5";


  return (
    <div>
        <h1>City:{city}</h1>
        <h1>Latitude:{lat}</h1>
        <h1>Longitude:{lon}</h1>
    </div>
  )
}

export default Weather;