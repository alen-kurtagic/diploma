import React, { useContext, useState } from "react";
import { AppContext } from "src/pages/Home/HomePage";
import { APISuggestion } from "src/types/apiTypes";
import getSuggestions from "src/services/api/suggestions/suggestion";
import Suggestions from "../Suggestions/Suggestions";
import "./search.sass";

const Search = () => {
  const appContext = useContext(AppContext);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const reversedString = value.split(",").reverse().join(", ");
    if (value.length > 0) {
      const results = await getSuggestions(reversedString);
      setSuggestions(results);
    } else {
      setSuggestions([]);
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
    setSuggestions([]);
  };

  return (
    <div className="search-suggestions-container">
      <div className="search-container">
        <input
          ref={appContext.inputRef}
          placeholder="Išči"
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
          handleInputValue={handleInputValue}
          suggestions={suggestions}
          inputValue={inputValue}
        ></Suggestions>
      )}
    </div>
  );
};

export default Search;
