import  {useEffect, useState} from "react";
import Coordinates from "./Coordinates.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const apiKey = "5435c55adea63ea73b9ec57a2da0e21e"

export default function Weather(){
    const [lat,setLat,]=useState<number|null>(null);
    const [lon,setLon]=useState<number|null>(null);
    const coordinates = new Coordinates();

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLat(parseFloat(latitude.toFixed(2)))
            setLon(parseFloat(longitude.toFixed(2)))
            coordinates.latitude=latitude;
            coordinates.longitude=longitude;
        })
    },)

    const weatherQuery = useQuery({
        queryKey: ["weather",lat,lon],
        queryFn: async () => {
            if (lat !== null && lon !== null) {
                const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                return response.data;
            }else{
                return Promise.resolve(null)
            }
        },
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

    return (
        <div>
            <h1>Weather</h1>

                <div>
                    <p>Temperature: {weatherQuery.data.current.temp}</p>
                </div>

        </div>
    );
}