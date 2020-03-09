import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Forecast.css";
import MiniForecast from "../components/MiniForecast";
import {
  EvaluateWeatherId,
  EvaluateTimeHour
} from "../components/weatherCalculator";

const Forecast = () => {
  const { cid } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState();

  useEffect(() => {
    const getCityForecast = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?id=${cid}&appid=c0d248183fbc1f3682cc81b9cf12d343&units=metric`
        ); // Fetch 5 day/3 hour forecast from open weather api

        const responseData = await response.json(); // Convert response to JSON

        if (!response.ok) {
          throw new Error(responseData.message); // Throw error if request not succesful
        }

        setCity(responseData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getCityForecast();
  }, [cid]);

  const handleSave = () => {
    console.log(city);
    console.log(`${city.city.name} added to library`);
  };

  const handleDelete = () => {
    console.log(`${city.city.name} deleted from library`);
  };

  return (
    <div className="wrapper forecast-container">
      {!isLoading && city && (
        <React.Fragment>
          <div className="forecast-container__top">
            <div className="forecast-container__top__left">
              <h1>{city.city.name}</h1>
              <h2>{Math.floor(city.list[0].main.temp)}°C</h2>
            </div>
            <div className="forecast-container__top__right">
              <h3>{EvaluateTimeHour(city.list[0].dt_txt)}h</h3>
              <div className="forecast__current-weather__animation">
                <div
                  className={EvaluateWeatherId(city.list[0].weather[0].id)}
                ></div>
              </div>
              <h2>{city.list[0].weather[0].main}</h2>
            </div>
          </div>
          <div className="forecast-container__bottom">
            {city.list.slice(1, 6).map((interval, i) => (
              <MiniForecast
                key={i}
                dateTime={interval.dt_txt}
                descriptionId={interval.weather[0].id}
                temperature={Math.floor(interval.main.temp)}
              />
            ))}
          </div>
          <div className="forecast-container__buttons">
            <Link onClick={handleDelete} to="/home">
              Remove
            </Link>
            <Link onClick={handleSave} to="/home">
              Save
            </Link>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Forecast;
