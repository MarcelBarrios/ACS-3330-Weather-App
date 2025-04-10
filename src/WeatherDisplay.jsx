function WeatherDisplay(props) {
    const { city, data } = props

    return (
        <div className="WeatherData">
            <h2>Current Weather in {city}</h2>
            <p>Temperature: {data.main.temp}°</p>
            <p>Feels Like: {data.main.feels_like}°</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Weather: {data.weather[0].description}</p>
        </div>
    )
}

export default WeatherDisplay