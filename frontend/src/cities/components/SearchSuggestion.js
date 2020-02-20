import React from "react";
import { Link } from "react-router-dom";

import "./SearchSuggestion.css";

const SearchSuggestion = props => {
  const { cityApiId, cityName, cityCountry } = props;

  const url = `/forecast/${cityApiId}`;

  return (
    <Link className="search-suggestion" to={url}>
      {cityName} - <span>{cityCountry}</span>
    </Link>
  );
};

export default SearchSuggestion;
