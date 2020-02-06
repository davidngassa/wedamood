import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";
import Button from "../UIElements/Button";

const LandingPage = () => {
  return (
    <div className="wrapper">
      <div id="background-wrap">
        <div class="x1">
          <div class="cloud"></div>
        </div>

        <div class="x2">
          <div class="cloud"></div>
        </div>

        <div class="x3">
          <div class="cloud"></div>
        </div>

        <div class="x4">
          <div class="cloud"></div>
        </div>

        <div class="x5">
          <div class="cloud"></div>
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
        <div class="icon sunny">
          <div class="sun">
            <div class="rays"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
