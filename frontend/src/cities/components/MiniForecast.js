import React from "react";

import "./MiniForecast.css";
import "./MiniAnimations.css";
import { EvaluateWeatherId, EvaluateTimeHour } from "./weatherCalculator";

const MiniForecast = props => {
  return (
    <div className="mini-forecast">
      <h3>{EvaluateTimeHour(props.dateTime)}h</h3>
      <div className="mini-forecast__animation">
        <div className={EvaluateWeatherId(props.descriptionId, "mini")}></div>
      </div>
      <h4>{props.temperature}°C</h4>
    </div>
  );
};

export default MiniForecast;
