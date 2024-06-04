import React, { useState, useEffect } from 'react';
import getLatLon from './functions';
import Weather from './Weather';
import './LatLon.css';

export const LatLon = () => {
    const [city, setCity] = useState('Wroclaw');
    const [coordinates, setCoordinates] = useState({ lat: 51.1079, lon: 17.0385 });
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

    useEffect(() => {
        fetchData(city);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(city);
    };

    return (
        <div className="latlon-container">
            <Weather city={city} coordinates={coordinates}/>
            <form onSubmit={handleSubmit} className="search-form">
                <label>Search for city</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <button type="submit">SEARCH</button>
            </form>
            {error && <p className="error">Error: {error}</p>}
        </div>
    );
};

export default LatLon;