// Module imports
import React, { useEffect, useState, useContext } from "react";

// Custom imports
import "./Home.css";
import CitiesList from "../components/CitiesList";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import cities from "../../data/mock";

// Constants to send weather API request
const API_KEY = "c0d248183fbc1f3682cc81b9cf12d343";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const Home = () => {
  const userCities = cities;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(userCities);
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  /* useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      const url = await `http://localhost:5000/api/cities/user/${userId}`;

      try {
        const response = await fetch(url); // Get user cities information from database
        const responseData = await response.json(); // convert response to JSON

        if (!response.ok) {
          throw new Error(responseData.message); // Throw error if request not successful
        }
        const userCities = responseData.cities; // Store userCities

        const retrievedData = [];

        if (userCities !== null) {
          // Loop over cities in userCities
          await Promise.each(userCities, async city => {
            try {
              const storeRes = await fetch(
                `${API_URL}?id=${city.cid}&appid=${API_KEY}&units=metric`
              ); // Fetch weather info for city from weather api

              const storeJSON = await storeRes.json(); // convert storeRes to JSON
              storeJSON.mongoId = city.id;
              retrievedData.push(storeJSON); // Add city to retrievedData
            } catch (err) {
              setError(err.message);
            }
          });
          // Store weather info in data
          setData(retrievedData);
        }

        setIsLoading(false);
        console.log({ userCities: retrievedData });
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []); */

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
      {!isLoading && data && (
        <div className="container">
          <CitiesList data={userCities} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
