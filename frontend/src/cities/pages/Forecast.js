import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

import "./Forecast.css";
import MiniForecast from "../components/MiniForecast";
import {
  EvaluateWeatherId,
  EvaluateTimeHour
} from "../components/weatherCalculator";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import Button from "../../shared/UIElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

const Forecast = () => {
  const { cid } = useParams();
  const [error, setError] = useState();
  const [isCitySaved, setIsCitySaved] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState();
  const auth = useContext(AuthContext);

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

    const checkIfCityAlreadySaved = async () => {
      const userCities = await JSON.parse(localStorage.getItem("userCities")); // Get user cities from local storage
      const foundCity = userCities.find(city => city.apiId === cid);
      foundCity ? setIsCitySaved(true) : setIsCitySaved(false);
    };

    getCityForecast();
    checkIfCityAlreadySaved();
  }, [cid]);

  const history = useHistory();

  const handleSave = async event => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/cities/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apiId: cid,
          user: auth.userId
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      history.push("/home");
    } catch (err) {
      setError(err.message || "Something went wrong, please try again");
      setIsLoading(false);
    }
  };

  const handleDelete = async event => {
    event.preventDefault();
    setIsLoading(true);

    let cityToBeDeletedId;

    const userCities = JSON.parse(localStorage.getItem("userCities")); // Get user cities from local storage

    userCities.forEach(city => {
      if (city.apiId === cid) {
        cityToBeDeletedId = city.id;
      }
    });

    try {
      const response = await fetch(
        `http://localhost:5000/api/cities/${cityToBeDeletedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      history.push("/home");
    } catch (err) {
      setError(err.message || "Something went wrong, please try again");
      setIsLoading(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />

      <div className="wrapper forecast-container">
        {isLoading && <LoadingSpinner />}
        {!isLoading && city && isCitySaved !== null && (
          <React.Fragment>
            <Link className="back-button" to="/home">
              <MdKeyboardBackspace size={32} />
              <p>Back to Home</p>
            </Link>

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
              {isCitySaved === true ? (
                <Button onClick={handleDelete}>Remove</Button>
              ) : (
                <Button onClick={handleSave}>Save</Button>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Forecast;
