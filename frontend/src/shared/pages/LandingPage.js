import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";
import Button from "../UIElements/Button";

const LandingPage = () => {
  return (
    <div className="wrapper ">
      <div id="background-wrap">
        <div className="x1">
          <div className="cloud"></div>
        </div>

        <div className="x2">
          <div className="cloud"></div>
        </div>

        <div className="x3">
          <div className="cloud"></div>
        </div>

        <div className="x4">
          <div className="cloud"></div>
        </div>

        <div className="x5">
          <div className="cloud"></div>
        </div>
      </div>
      <div className="landing-description">
        <h1>Welcome to your weather app</h1>
        <p>
          Ea duis et et laborum est ullamco veniam mollit ea consequat commodo
          nisi elit. In aute aliqua nisi aliqua. Aliqua velit Lorem irure quis
          quis officia qui aute tempor. This is a dummy text that will be
          replaced with actula content later.
        </p>
        <Link to="/auth">
          <Button>GET STARTED</Button>
        </Link>
      </div>
      <div className="animation">
        <div className="icon">
          <div className="sun">
            <div className="rays"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
