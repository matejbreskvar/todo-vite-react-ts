import  {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import "./styles.css"

const apiKey = ""

export default function Weather(){
    const [lat,setLat,]=useState<number|null>(null);
    const [lon,setLon]=useState<number|null>(null);
    const [showNoData, setShowNoData] = useState(true);
    const [showError, setShowError] = useState(true);

    const handleNoDataClick = () => setShowNoData(false);
    const handleErrorClick = () => setShowError(false);

    //useEffect is used to execute every render. Function gets the coordinates->needed in api call.
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLat(parseFloat(latitude.toFixed(2)))
            setLon(parseFloat(longitude.toFixed(2)))
        })
    },)

    //Query makes an API call. QueryFn is async, because await is crucial, when calling api link.
    const weatherQuery = useQuery({
        queryKey: ["weather"],
        queryFn: async () => {
            if (lat !== null && lon !== null) {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                return response.data;
            }else{
                return Promise.resolve(null)
            }
        },
        //enabled is true -> query will work. Query should execute only when lat and lon are not null.
        enabled: lat !== null && lon !== null
    });
    if (!weatherQuery.data) {
        return <div className={`floatingContainer noData ${!showNoData ? 'hidden' : ''}`} onClick={handleNoDataClick}>No weather data available</div>;
    }

    if (weatherQuery.isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (weatherQuery.isError) {
        return <div className={`floatingContainer error ${!showError ? 'hidden' : ''}`} onClick={handleErrorClick}>Error: {weatherQuery.error.message}</div>;
    }
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherQuery.data.weather[0].icon}@2x.png`

    return (
        <div className="divWeather">
            <h2>Weather</h2>

                <div>
                    <p className="temp">Temperature: {weatherQuery.data.main.temp.toFixed(1)}</p>
                    <p className="weather">Weather: {weatherQuery.data.weather[0].description}</p>
                    <div className="iconContainer">
                        <img className="weatherIcon" src={weatherIconUrl}
                             alt={weatherQuery.data.weather[0].description}/>
                    </div>

                </div>

        </div>
    );
}