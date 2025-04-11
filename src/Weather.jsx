import { useState } from "react";
import RadioButton from "./RadioButton";
import WeatherDisplay from "./WeatherDisplay";
import "./Weather.css";

function Weather() {
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('metric');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = '65180f441b6371c9c76fd8cc06e5a6f2';

    async function fetchWeatherByCity() {
        try {
            setLoading(true);
            setError(null);
            const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
            const geoData = await geoRes.json();

            if (!geoData.length) {
                setError("City not found!");
                setData(null);
                setLoading(false);
                return;
            }

            const { lat, lon } = geoData[0];
            await fetchWeatherByCoords(lat, lon);
        } catch (err) {
            setError("Failed to fetch weather data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchWeatherByCoords(lat, lon) {
        try {
            const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`);
            const weatherJson = await weatherRes.json();

            if (weatherJson.cod !== 200) {
                setError("Weather data not found.");
                setData(null);
                return;
            }

            setData(weatherJson);
            setError(null);
        } catch (err) {
            setError("Failed to fetch weather data.");
            console.error(err);
        }
    }

    function handleGeolocation() {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }
        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoords(latitude, longitude);
            setLoading(false);
        }, () => {
            setError("Unable to retrieve your location.");
            setLoading(false);
        });
    }

    const weatherCondition = data?.weather[0]?.main || '';

    // Set background class based on weather condition
    let bgClass = 'weather-default';
    if (weatherCondition) {
        bgClass = `weather-${weatherCondition.toLowerCase()}`;
    }

    return (
        <div className={`weather-container ${bgClass}`}>
            <div className="weather-search-container">
                <h1 className="weather-title">Weather App</h1>

                <form onSubmit={e => {
                    e.preventDefault();
                    fetchWeatherByCity();
                }} className="weather-form">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            pattern="^[a-zA-Z\s]+$"
                            onChange={e => setCity(e.target.value)}
                            className="search-input"
                        />
                        <button
                            type="submit"
                            className="search-button"
                        >
                            Search
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleGeolocation}
                        className="location-button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="location-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Use My Location
                    </button>

                    <div className="unit-container">
                        <p className="unit-title">Temperature Units:</p>
                        <div className="radio-group">
                            <RadioButton label="Celsius" name="unit" checked={unit === 'metric'} onChange={() => setUnit('metric')} />
                            <RadioButton label="Fahrenheit" name="unit" checked={unit === 'imperial'} onChange={() => setUnit('imperial')} />
                            <RadioButton label="Kelvin" name="unit" checked={unit === 'standard'} onChange={() => setUnit('standard')} />
                        </div>
                    </div>
                </form>
            </div>

            <div className="weather-display-container">
                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                )}

                {error && (
                    <div className="error-container">
                        <p className="error-title">Error</p>
                        <p className="error-message">{error}</p>
                    </div>
                )}

                {data && !loading && <WeatherDisplay city={data.name} data={data} unit={unit} />}
            </div>
        </div>
    );
}

export default Weather;