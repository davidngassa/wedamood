// Module imports
import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Custom imports
import "./CitiesList.css";
import City from "./City";

const CitiesList = props => {
  const userCities = props.data;

  return (
    <OwlCarousel className="owl-theme" margin={20} nav items={4}>
      {userCities.map((city, i) => (
        <City
          key={i}
          id={city.id}
          name={city.name}
          weather={city.weather[0].main}
          weatherId={city.weather[0].id}
          currTemp={city.main.temp}
          minTemp={city.main.temp_min}
          maxTemp={city.main.temp_max}
        />
      ))}
    </OwlCarousel>
  );
};

export default CitiesList;
