import React from "react";

import "./City.css";
import "./Animations.css";
import { EvaluateWeatherId } from "./weatherCalculator";

const City = props => {
  const { name, currTemp, minTemp, maxTemp, weatherId } = props;
  const weatherDescription = EvaluateWeatherId(weatherId);
  console.log("weather id : " + weatherId);
  console.log("weather description : " + weatherDescription);

  return (
    <div className="city">
      <div className="city__header">
        <h1>{name}</h1>
        <h1>{currTemp}°C</h1>
      </div>
      <div className="city__animation">
        <div className={weatherDescription}></div>
      </div>
      <h1 className="city__weather-description">{weatherDescription}</h1>
      <div className="city__footer">
        <div className="city__temperature">
          <h4>Min</h4>
          <h3>{minTemp}°C</h3>
        </div>
        <div className="city__temperature">
          <h4>Max</h4>
          <h3>{maxTemp}°C</h3>
        </div>
      </div>
    </div>
  );
};

export default City;
