import "./WeatherDisplay.css";

function WeatherDisplay({ city, data, unit }) {
    // Temperature unit symbols
    const unitSymbols = {
        metric: '°C',
        imperial: '°F',
        standard: 'K'
    };

    // Wind speed units
    const windSpeedUnits = {
        metric: 'm/s',
        imperial: 'mph',
        standard: 'm/s'
    };

    // Get weather condition for styling
    const weatherCondition = data.weather[0].main.toLowerCase();

    return (
        <div className="weather-display">
            <div className="weather-header">
                <h2 className="city-name">{city}</h2>
                <p className="current-date">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className="weather-main">
                <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                    alt="weather icon"
                    className="weather-icon"
                />
                <div className="temperature-container">
                    <p className="temperature">{Math.round(data.main.temp)}{unitSymbols[unit]}</p>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
            </div>

            <div className="weather-details">
                <div className={`weather-detail-item weather-${weatherCondition}`}>
                    <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="detail-info">
                        <p className="detail-label">Feels Like</p>
                        <p className="detail-value">{Math.round(data.main.feels_like)}{unitSymbols[unit]}</p>
                    </div>
                </div>

                <div className={`weather-detail-item weather-${weatherCondition}`}>
                    <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                    </div>
                    <div className="detail-info">
                        <p className="detail-label">Humidity</p>
                        <p className="detail-value">{data.main.humidity}%</p>
                    </div>
                </div>

                <div className={`weather-detail-item weather-${weatherCondition}`}>
                    <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                        </svg>
                    </div>
                    <div className="detail-info">
                        <p className="detail-label">Wind Speed</p>
                        <p className="detail-value">{data.wind.speed} {windSpeedUnits[unit]}</p>
                    </div>
                </div>

                <div className={`weather-detail-item weather-${weatherCondition}`}>
                    <div className="detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="detail-info">
                        <p className="detail-label">Pressure</p>
                        <p className="detail-value">{data.main.pressure} hPa</p>
                    </div>
                </div>
            </div>

            {data.rain && (
                <div className="precipitation-info rain-info">
                    <p>Rain volume (last 1h): {data.rain['1h']} mm</p>
                </div>
            )}

            {data.snow && (
                <div className="precipitation-info snow-info">
                    <p>Snow volume (last 1h): {data.snow['1h']} mm</p>
                </div>
            )}
        </div>
    );
}

export default WeatherDisplay;