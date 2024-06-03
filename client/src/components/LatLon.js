import React, { useState } from 'react';
import getLatLon from './functions';
import Weather from './Weather';

export const LatLon = () => {
    const [city, setCity] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);

    const fetchData = async (cityName) => {
        try {
            const { lat, lon } = await getLatLon(cityName);
            setCoordinates({ lat, lon });
            setError(null);
        } catch (error) {
            setError(error.message);
            setCoordinates({ lat: null, lon: null });
        }
    };  

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(city);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Search for city</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <button type="submit">SEARCH</button>
            </form>
            {error && <p>Error: {error}</p>}
            {coordinates.lat !== null && coordinates.lon !== null && (
                <Weather city={city} coordinates={coordinates}/>
            )}
        </div>
    );
};

export default LatLon;