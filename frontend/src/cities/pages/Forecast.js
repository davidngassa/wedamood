import React from "react";

import "./Forecast.css";

const Forecast = () => {
  const { cid } = this.props.match.params;
  console.log(cid);

  return (
    <div className="container forecast-container">
      <div className="forecast__top-container">
        <div className="forecast__top-container__left">
          <h1>Yaounde</h1>
          <h1>Temperature</h1>
        </div>
        <div className="forecast__top-container__right">
          <div className="forecast__current-weather__animation">
            <h2>Animation</h2>
          </div>
        </div>
      </div>
      <div className="forecast__bottom-container">
        <div>Alot</div>
      </div>
      <button className="forecast__add-button">ADD CITY</button>
    </div>
  );
};

export default Forecast;
