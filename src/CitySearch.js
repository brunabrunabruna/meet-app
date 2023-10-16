import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  //
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // to hide the list
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="search for a city"
        value={query}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li key={suggestion} onClick={handleItemClicked}>
                {suggestion}
              </li>
            );
          })}
          <li key="see all cities" onClick={handleItemClicked}>
            {" "}
            <b>see all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;