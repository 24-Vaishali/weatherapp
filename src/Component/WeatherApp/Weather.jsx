import React, { useEffect, useState } from 'react'
import './Weather.css'
import cloud from '../Images/cloud.png'


const Weather = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("indore");
    const [windData, setWindData] = useState(null);



    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=24d8d7054ba89a489dc43f0ed617303b`;
            const response = await fetch(url);

            const resJson = await response.json();
            setCity(resJson.main);
            setWindData(resJson.wind);
        }
        fetchApi();
    }, [search]);

    return (
        <div className="outer-container">
            <h1 className='title'>Discover the weather every city you want to know</h1>
            <div className="inner-container">
                <div className='search_bar'>
                    <input type='text' placeholder='Search here....' className='cityName' value={search}
                        onChange={(event) => { setSearch(event.target.value) }}
                    />
                    <i className="fa-solid fa-magnifying-glass search_icon"></i>
                </div>
                {
                    !city ? (
                        <>
                            <p className='found_error'>No City Data Found .... <i className="fa-solid fa-xmark"></i> </p>
                            <p className='correct_name'>Please write the correct name of the city <i className="fa-solid fa-location-dot"></i>.</p>
                        </>
                    ) : (
                        <>
                            <div className='weathe_images'>
                                <img src={cloud} alt='cloud' />
                            </div>
                            <div className='Weather_temprature'>
                                {city.temp}°C
                            </div>
                            <div>
                                {` Min :  ${city.temp_min}°C | Max : ${city.temp_max}°C`}
                            </div>
                            <div className='weather_city'>
                                {/* {city.name} */}
                                {search}
                            </div>

                            <div className='weather_details'>
                                <div className='elements'>
                                    <i className="fa-solid fa-water humidity_icon"></i>
                                    <div className='details'>
                                        <div className='humidity'>{city.humidity}%</div>
                                        <div className='text'>Humidity</div>
                                    </div>
                                </div>

                                <div className='elements'>
                                    <i className="fa-solid fa-wind wind_icon"></i>
                                    <div className='details'>
                                        <div className='wind'>{windData.speed} km/hr</div>
                                        <div className='text'>Wind Speed</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>

    )
}

export default Weather
