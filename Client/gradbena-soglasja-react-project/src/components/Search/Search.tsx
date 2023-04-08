import React, { useContext, useEffect, useRef, useState } from "react";
import Suggestions from "../Suggestions/Suggestions";
import { AppContext } from "../../App";
import { APISuggestion } from "../../types/types";
import getSuggestions from "../../api/suggestions";

const Search = () => {
  const appContext = useContext(AppContext);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
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
      const results = await getSuggestions(value);
      setAutocompleteSuggestions(results);
    } else {
      setAutocompleteSuggestions([]);
    }
  };
  // This function handles keyboard events in the input field.
  // If the user presses "Enter", it fetches search suggestions using
  // "getSuggestions" function and goes to the first suggestion's location.
  // If the user presses "Escape", it removes focus from the input field.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter" && appContext.inputRef.current) {
      const suggestions = getSuggestions(appContext.inputRef.current.value);
      suggestions.then((suggestions: APISuggestion[]) => {
        const firstSuggestion = suggestions[0];
        appContext.goToLocation({ location: firstSuggestion });
        setInputValue(firstSuggestion.ac_text);
        appContext.inputRef.current?.blur();
      });
    } else if (event.key == "Escape" && appContext.inputRef.current) {
      event.stopPropagation();
      appContext.inputRef.current.blur();
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
          ref={appContext.inputRef}
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
        <Suggestions
          className="autocomplete-container"
          handleInputValue={handleInputValue}
          suggestions={autocompleteSuggestions}
          inputValue={inputValue}
        ></Suggestions>
      )}
    </div>
  );
};

export default Search;
