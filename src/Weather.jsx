import { useState } from "react";
import RadioButton from "./RadioButton";
import WeatherDisplay from "./WeatherDisplay";

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

    const bgClasses = {
        Clear: "bg-gradient-to-b from-blue-300 to-yellow-200",
        Rain: "bg-gradient-to-b from-gray-400 to-gray-600",
        Clouds: "bg-gradient-to-b from-blue-100 to-gray-300",
        Snow: "bg-gradient-to-b from-blue-50 to-blue-200",
        Thunderstorm: "bg-gradient-to-b from-purple-300 to-purple-500",
        Drizzle: "bg-gradient-to-b from-cyan-100 to-cyan-300",
        Mist: "bg-gradient-to-b from-gray-200 to-gray-400",
    };

    const bgClass = bgClasses[weatherCondition] || "bg-gradient-to-b from-blue-50 to-blue-100";

    return (
        <div className={`min-h-screen flex flex-col items-center py-8 px-4 ${bgClass} transition-all duration-500`}>
            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Weather App</h1>

                <form onSubmit={e => {
                    e.preventDefault();
                    fetchWeatherByCity();
                }} className="space-y-4">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            pattern="^[a-zA-Z\s]+$"
                            onChange={e => setCity(e.target.value)}
                            className="p-3 border border-gray-300 rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-200"
                        >
                            Search
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleGeolocation}
                        className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Use My Location
                    </button>

                    <div className="mt-4">
                        <p className="font-medium text-gray-700 mb-2">Temperature Units:</p>
                        <div className="flex gap-4 bg-gray-100 p-2 rounded-lg">
                            <RadioButton label="Celsius" name="unit" checked={unit === 'metric'} onChange={() => setUnit('metric')} />
                            <RadioButton label="Fahrenheit" name="unit" checked={unit === 'imperial'} onChange={() => setUnit('imperial')} />
                            <RadioButton label="Kelvin" name="unit" checked={unit === 'standard'} onChange={() => setUnit('standard')} />
                        </div>
                    </div>
                </form>
            </div>

            <div className="w-full max-w-md transition-all duration-500 ease-in-out">
                {loading && (
                    <div className="flex justify-center items-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {data && !loading && <WeatherDisplay city={data.name} data={data} unit={unit} />}
            </div>
        </div>
    );
}

export default Weather;