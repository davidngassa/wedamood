import React from "react";
import { Link } from "react-router-dom";

import "./SearchSuggestion.css";

const SearchSuggestion = props => {
  return (
    <Link className="search-suggestion">
      {props.cityName} - <span>{props.cityCountry}</span>
    </Link>
  );
};

export default SearchSuggestion;
