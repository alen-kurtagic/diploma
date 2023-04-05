import React, { useContext, useEffect, useRef, useState } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import getAutocompleteResults, {
  APIAutocompleteItem,
} from "../../api/autocomplete";
import { ViewStateContext } from "../../App";
import proj4 from "proj4";

const Search = () => {
  const viewStateContext = useContext(ViewStateContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const results = await getAutocompleteResults(value);
      setAutocompleteSuggestions(results);
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter" && inputRef.current) {
      const results = getAutocompleteResults(inputRef.current.value);
      results.then((value) => {
        const result: APIAutocompleteItem = value[0];
        const point1 = proj4("EPSG:3794", "EPSG:3857", [result.x1, result.y1]);
        const point2 = proj4("EPSG:3794", "EPSG:3857", [result.x2, result.y2]);
        viewStateContext.flyTo({
          point1: point1,
          point2: point2,
        });
        setInputValue(result.ac_text);
        inputRef.current?.blur();
      });
    } else if (event.key == "Escape" && inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleInputValue = (value: string) => {
    setInputValue(value);
  };

  const handleClear = (event: React.PointerEvent<HTMLImageElement>) => {
    event.preventDefault();
    setInputValue("");
    setAutocompleteSuggestions([]);
  };

  return (
    <div className="search-autocomplete-container">
      <div className="search-container">
        <input
          ref={inputRef}
          placeholder="Išči parcele..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
        <img src="src/assets/search.svg" className="search-icon"></img>
        {isFocused && inputValue.length > 0 && (
          <img
            src="src/assets/x.svg"
            className="clear-input"
            onPointerDown={handleClear}
          ></img>
        )}
      </div>
      {isFocused && (
        <Autocomplete
          className="autocomplete-container"
          handleInputValue={handleInputValue}
          autocompleteSuggestions={autocompleteSuggestions}
        ></Autocomplete>
      )}
    </div>
  );
};

export default Search;
