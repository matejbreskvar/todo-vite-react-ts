import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import "./styles/weatherStyles.css"

const apiKey = "";  // Your API key for OpenWeatherMap

export default function Weather() {
    // State to store latitude and longitude
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    // State to control the visibility of the "No data" and "Error" messages
    const [showNoData, setShowNoData] = useState(true);
    const [showError, setShowError] = useState(true);

    // Handlers to hide "No data" and "Error" messages when clicked
    const handleNoDataClick = () => setShowNoData(false);
    const handleErrorClick = () => setShowError(false);

    // Effect to get user's geolocation and set latitude and longitude
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setLat(parseFloat(latitude.toFixed(2)));
            setLon(parseFloat(longitude.toFixed(2)));
        });
    }, []);  // Empty dependency array means this effect runs once on mount

    // Query to fetch weather data based on latitude and longitude
    const weatherQuery = useQuery({
        queryKey: ["weather"],  // Key for the query cache
        queryFn: async () => {
            if (lat !== null && lon !== null) {
                // Fetch weather data from OpenWeatherMap API
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                return response.data;
            } else {
                return Promise.resolve(null);  // Return null if coordinates are not available
            }
        },
        enabled: lat !== null && lon !== null  // Query is enabled only if lat and lon are available
    });

    // Render different content based on query state
    if (!weatherQuery.data) {
        return (
            <div
                className={`floatingContainer noData ${!showNoData ? 'hidden' : ''}`}
                onClick={handleNoDataClick}
            >
                No weather data available
            </div>
        );
    }

    if (weatherQuery.isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (weatherQuery.isError) {
        return (
            <div
                className={`floatingContainer error ${!showError ? 'hidden' : ''}`}
                onClick={handleErrorClick}
            >
                Error: {weatherQuery.error.message}
            </div>
        );
    }

    // Construct the URL for the weather icon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherQuery.data.weather[0].icon}@2x.png`;

    return (
        <div className="divWeather">
            <h2 id="weatherTitle">Weather</h2>


            <div className="temp">Temperature: {weatherQuery.data.main.temp.toFixed(0)}°C</div>
            <div className="weather">Weather: {weatherQuery.data.weather[0].description}</div>
            <div className="iconPlacement">
                <img className="weatherIcon" src={weatherIconUrl}
                     alt={weatherQuery.data.weather[0].description}/>

            </div>

        </div>
    );
}