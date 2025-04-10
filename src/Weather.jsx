import { useState } from "react";
import './Weather.css';
import RadioButton from "./RadioButton";
import WeatherDisplay from "./WeatherDisplay";

function Weather() {
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('metric');
    const [data, setData] = useState(null);
    const apiKey = '65180f441b6371c9c76fd8cc06e5a6f2';

    // ----------------------------------------
    async function fetchWeather() {
        try {
            const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
            const geoData = await geoRes.json();

            if (!geoData.length) {
                alert("City not found!");
                return;
            }

            const { lat, lon } = geoData[0];

            const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`);
            const weatherJson = await weatherRes.json();

            setData(weatherJson);
        } catch (err) {
            console.error("Error fetching weather:", err);
            alert("Failed to fetch weather data.");
        }
    }
    // ----------------------------------------

    return (
        <div className="Weather">
            <form onSubmit={e => {
                e.preventDefault();
                fetchWeather();
            }}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </div>

                <select onChange={e => setUnit(e.target.value)} value={unit}>
                    <option value="metric">Celsius</option>
                    <option value="imperial">Fahrenheit</option>
                    <option value="standard">Kelvin</option>
                </select>

                <RadioButton
                    label="metric"
                    name="unit"
                    checked={unit === 'metric'}
                    onChange={() => setUnit('metric')}
                />
                <RadioButton
                    label="imperial"
                    name="unit"
                    checked={unit === 'imperial'}
                    onChange={() => setUnit('imperial')}
                />
                <RadioButton
                    label="standard"
                    name="unit"
                    checked={unit === 'standard'}
                    onChange={() => setUnit('standard')}
                />
            </form>

            {data && (<WeatherDisplay city={city} data={data}></WeatherDisplay>
            )}
        </div>
    );
}

export default Weather;
