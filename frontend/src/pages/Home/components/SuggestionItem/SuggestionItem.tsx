import React, { useContext } from "react";
import { HomeContext } from "src/pages/Home/HomePage";
import { SuggestionValues } from "src/services/api/suggestions/suggestion";
import "./suggestion-item.sass";

interface SuggestionItemProps {
  suggestion: SuggestionValues;
  handleSuggestionClick: (value: string) => void;
  userInput: string;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  handleSuggestionClick,
  userInput,
}) => {
  const { inputRef, goToLocation } = useContext(HomeContext);

  const locationName = userInput.split(",")[0].trim();
  const lowerCaseLocationName = locationName.toLowerCase();
  const suggestedName = suggestion.locationName || suggestion.cityName;

  const matchIndex = suggestedName.toLowerCase().indexOf(lowerCaseLocationName);
  const suggestionFullName: string = [
    suggestion.locationName,
    suggestion.cityName,
  ]
    .filter(Boolean)
    .join(", ");

  const handleClick = (event: React.PointerEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleSuggestionClick(suggestionFullName);
    goToLocation({ location: suggestion });
    inputRef.current?.blur();
  };

  const getIcon = () => {
    // Regex checks if it is not a digit.
    if (suggestion.text[0].match(/\d/)) {
      return (
        <img
          src="./src/assets/icons/home.svg"
          className="suggestion-icon"
          alt="Home icon"
        />
      );
    } else if (suggestion.locationName) {
      return (
        <img
          src="./src/assets/icons/location.svg"
          className="suggestion-icon"
          alt="Location icon"
        />
      );
    } else {
      return (
        <img
          src="./src/assets/icons/city.svg"
          className="suggestion-icon"
          alt="City icon"
        />
      );
    }
  };

  const getHighlightedSuggestion = () => {
    if (matchIndex < 0) return;

    const prefix = suggestedName.slice(0, matchIndex);
    const highlightString = suggestedName.slice(
      matchIndex,
      matchIndex + locationName.length
    );
    const suffix = suggestedName.slice(matchIndex + locationName.length);

    return (
      <span>
        {prefix}
        <span className="highlight">{highlightString}</span>
        {suffix}
        {suggestion.locationName && (
          <span className="city-name">{suggestion.cityName}</span>
        )}
      </span>
    );
  };

  return (
    <li className="suggestion-item" onPointerDown={handleClick}>
      {getIcon()}
      {getHighlightedSuggestion()}
    </li>
  );
};

export default SuggestionItem;
