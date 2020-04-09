import React from "react";

import "./MiniForecast.css";
import "./MiniAnimations.css";
import { EvaluateWeatherId, EvaluateTimeHour } from "./weatherCalculator";

const MiniForecast = props => {
  return (
    <div className="mini-forecast">
      <h4>{EvaluateTimeHour(props.dateTime)}h</h4>
      <div className="mini-forecast__animation">
        <div className={EvaluateWeatherId(props.descriptionId, "mini")}></div>
      </div>
      <h3>{props.temperature}°C</h3>
    </div>
  );
};

export default MiniForecast;
