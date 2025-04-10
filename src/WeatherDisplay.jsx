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

    // Weather condition styling
    const conditionClasses = {
        Clear: "bg-yellow-100 text-yellow-800 border-yellow-300",
        Rain: "bg-blue-100 text-blue-800 border-blue-300",
        Clouds: "bg-gray-100 text-gray-800 border-gray-300",
        Snow: "bg-blue-50 text-blue-800 border-blue-200",
        Thunderstorm: "bg-purple-100 text-purple-800 border-purple-300",
        Drizzle: "bg-cyan-100 text-cyan-800 border-cyan-300",
        Mist: "bg-gray-100 text-gray-700 border-gray-200",
    };

    const conditionClass = conditionClasses[data.weather[0].main] || "bg-white text-gray-800 border-gray-200";

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-600 text-white">
                <h2 className="text-2xl font-bold text-center">
                    {city}
                </h2>
                <p className="text-center text-blue-100">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                    alt="weather icon"
                    className="w-24 h-24"
                />
                <div className="text-center">
                    <p className="text-5xl font-bold">{Math.round(data.main.temp)}{unitSymbols[unit]}</p>
                    <p className="text-xl capitalize">{data.weather[0].description}</p>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg border ${conditionClass} flex items-center`}>
                        <div className="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Feels Like</p>
                            <p className="text-lg">{Math.round(data.main.feels_like)}{unitSymbols[unit]}</p>
                        </div>
                    </div>

                    <div className={`p-3 rounded-lg border ${conditionClass} flex items-center`}>
                        <div className="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Humidity</p>
                            <p className="text-lg">{data.main.humidity}%</p>
                        </div>
                    </div>

                    <div className={`p-3 rounded-lg border ${conditionClass} flex items-center`}>
                        <div className="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Wind Speed</p>
                            <p className="text-lg">{data.wind.speed} {windSpeedUnits[unit]}</p>
                        </div>
                    </div>

                    <div className={`p-3 rounded-lg border ${conditionClass} flex items-center`}>
                        <div className="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Pressure</p>
                            <p className="text-lg">{data.main.pressure} hPa</p>
                        </div>
                    </div>
                </div>

                {data.rain && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">
                            Rain volume (last 1h): {data.rain['1h']} mm
                        </p>
                    </div>
                )}

                {data.snow && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">
                            Snow volume (last 1h): {data.snow['1h']} mm
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherDisplay;