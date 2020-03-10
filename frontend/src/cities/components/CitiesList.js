// Module imports
import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Custom imports
import "./CitiesList.css";
import City from "./City";
import AddCityButton from "./AddCityButton";

const CitiesList = props => {
  const userCities = props.cities;

  console.log(userCities);

  return (
    <OwlCarousel className="owl-theme" margin={100} nav dots={false} items={3}>
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
      <AddCityButton />
    </OwlCarousel>
  );
};

export default CitiesList;
