// Module imports
import React, { useEffect, useState, useContext } from "react";

// Custom imports
import "./Home.css";
import CitiesList from "../components/CitiesList";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

// Constants to send weather API request
const API_KEY = "&appid=c0d248183fbc1f3682cc81b9cf12d343&units=metric";
const API_URL = "https://api.openweathermap.org/data/2.5/group?id=";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [userCities, setUserCities] = useState(null);
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  useEffect(() => {
    const getUserCities = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:5000/api/cities/user/5e66ad7f0eae815764c201cb`
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        sendRequestToWeatherApi(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      }
    };

    const sendRequestToWeatherApi = async data => {
      const userLibrary = data.userCities;
      let cityIds = "";

      if (userLibrary === 0) {
        throw new Error("User library is empty");
      }

      // Concatenate city Ids into one string
      for (let i = 0; i < userLibrary.length; i++) {
        if (i === userLibrary.length - 1) {
          cityIds += userLibrary[i].apiId;
        } else {
          cityIds += userLibrary[i].apiId + ",";
        }
      }

      // Send request to weather api
      try {
        const response = await fetch(API_URL + cityIds + API_KEY);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setUserCities(responseData.list);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    getUserCities();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="container">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userCities && (
        <div className="container">
          <CitiesList cities={userCities} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
