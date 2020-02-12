import React, { useState } from "react";

import "./Search.css";
import SearchSuggestion from "../components/SearchSuggestion";
import citiesJson from "../../data/citiesJson.json";

const Search = () => {
  const [results, setResults] = useState([]);

  // Filter through the list of cities to search result
  const Filter = text => {
    if (text !== "") {
      const filterResult = citiesJson.filter(city => {
        const cityName = city.name.toLowerCase();
        const searchText = text.toLowerCase();

        return cityName.startsWith(searchText);
      });

      setResults(filterResult);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="container search-container">
      <div className="search-wrapper">
        <input
          id="search-input"
          autoComplete="off"
          placeholder="Search for a city"
          onChange={e => Filter(e.target.value)}
          autoFocus
          spellCheck="false"
        ></input>
        <div className="search-result">
          {results.slice(0, 5).map((city, i) => (
            <SearchSuggestion
              cityName={city.name}
              cityCountry={city.country}
              cityApiId={city.Id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
