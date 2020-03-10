import React from "react";
import { Link } from "react-router-dom";

import "./City.css";
import "./Animations.css";
import { EvaluateWeatherId } from "./weatherCalculator";

const City = props => {
  const { name, currTemp, minTemp, maxTemp, weatherId, id } = props;
  const weatherDescription = EvaluateWeatherId(weatherId);
  const url = `/forecast/${id}`;

  return (
    <Link to={url}>
      <div className="city">
        <div className="city__header">
          <h1>{name}</h1>
          <h1>{Math.floor(currTemp)}°C</h1>
        </div>
        <div className="city__animation">
          <div className={weatherDescription}></div>
        </div>
        <h1 className="city__weather-description">{weatherDescription}</h1>
        <div className="city__footer">
          <div className="city__temperature">
            <h4>Min</h4>
            <h3>{Math.floor(minTemp)}°C</h3>
          </div>
          <div className="city__temperature">
            <h4>Max</h4>
            <h3>{Math.floor(maxTemp)}°C</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default City;
