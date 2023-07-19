import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { HomeContext } from "src/pages/Home/HomePage";
import { SuggestionValues } from "src/services/api/suggestions/suggestion";
import getSuggestions from "src/services/api/suggestions/suggestion";
import SuggestionList from "../SuggestionList/SuggestionList";
import "./search-bar.sass";

const SearchBar = () => {
  const { inputRef, goToLocation } = useContext(HomeContext);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestionList, setSuggestionList] = useState<SuggestionValues[]>([]);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    if (!searchText || searchText.length === 0) {
      setSuggestionList([]);
    }
  }, [searchText]);

  const { data: suggestionsData } = useQuery<SuggestionValues[]>(
    ["suggestions", searchText],
    () => getSuggestions(searchText.split(",").reverse().join(", ")),
    {
      enabled: (searchText && searchText.length > 0) || false, // Only run the query if `searchText` is not empty
      onSuccess: (data) => setSuggestionList(data),
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter" && inputRef.current) {
      getSuggestions(inputRef.current.value)
        .then((suggestions) => {
          const firstSuggestion = suggestions[0];
          goToLocation({ location: firstSuggestion });
          setSearchText(firstSuggestion.text);
          inputRef.current!.blur();
        })
        .catch((error) => {
          console.log(error); // or handle the error as appropriate
        });
    } else if (event.key == "Escape" && inputRef.current) {
      event.stopPropagation();
      inputRef.current.blur();
    }
  };

  const handleSuggestionClick = (value: string) => {
    setSuggestionList([]);
    setSearchText(value);
  };

  const handleClear = (event: React.PointerEvent<HTMLImageElement>) => {
    event.preventDefault();
    setSearchText("");
  };

  return (
    <div className="search-suggestions-container">
      <div className="search-container">
        <input
          ref={inputRef}
          placeholder="Išči"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <img
          src="src/assets/icons/search.svg"
          className="search-icon"
          alt="Search"
        />
        {isInputFocused && searchText.length > 0 && (
          <img
            src="src/assets/icons/x.svg"
            className="clear-input"
            onPointerDown={handleClear}
            alt="Clear"
          />
        )}
      </div>
      {isInputFocused && (
        <SuggestionList
          handleSuggestionClick={handleSuggestionClick}
          suggestions={suggestionList}
          userInput={searchText}
        />
      )}
    </div>
  );
};

export default SearchBar;
