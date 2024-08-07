import  {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import "./styles.css"

const apiKey = ""

export default function Weather(){
    const [lat,setLat,]=useState<number|null>(null);
    const [lon,setLon]=useState<number|null>(null);

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
        return <div>No data available</div>;
    }

    if (weatherQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (weatherQuery.isError) {
        return <div>Error: {weatherQuery.error.message}</div>;
    }
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherQuery.data.weather[0].icon}@2x.png`

    return (
        <div className="divWeather">
            <h1>Weather</h1>

                <div>
                    <p className="temp">Temperature: {weatherQuery.data.main.temp.toFixed(1)}</p>
                    <p className="weather">Weather: {weatherQuery.data.weather[0].description}</p>
                    <img className="weatherIcon" src={weatherIconUrl} alt={weatherQuery.data.weather[0].description} />
                </div>

        </div>
    );
}