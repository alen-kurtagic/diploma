import React, { useContext } from "react";
import { AppContext } from "src/pages/Home/HomePage";
import { APISuggestion } from "src/types/types";

type SuggestionProps = {
  suggestionValues: APISuggestion;
  handleInputValue: (value: string) => void;
  inputValue: string;
};

const Suggestion: React.FC<SuggestionProps> = ({
  suggestionValues,
  handleInputValue,
  inputValue,
}) => {
  const appContext = useContext(AppContext);

  const locationName = inputValue.split(",")[0].trim();

  // Returns the first index at which a given element can be found in the
  // array, or -1 if it is not present.
  const matchIndex = (
    suggestionValues.locationName || suggestionValues.cityName
  )
    .toLowerCase()
    .indexOf(locationName.toLowerCase());

  // Cancel the suggestion if it is not a perfect match with input,
  // even if the API suggests it.
  //if (matchIndex < 0) return <></>;

  const fullNameComma: string = [
    suggestionValues.locationName,
    suggestionValues.cityName,
  ].join(", ");

  const handleItemClick = (event: React.PointerEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleInputValue(fullNameComma);
    appContext.goToLocation({ location: suggestionValues });
    appContext.inputRef.current?.blur();
  };

  const startsWithNumber = (str: string): boolean => {
    return /^\d/.test(str);
  };
  const getIcon = () => {
    return startsWithNumber(inputValue) ? (
      <img src="./src/assets/home.svg" className="icon-home"></img>
    ) : (
      <img src="./src/assets/location.svg" className="icon-location"></img>
    );
  };

  const getBoldMatch = () => {
    if (matchIndex < 0) return;
    const prefix = (
      suggestionValues.locationName || suggestionValues.cityName
    ).slice(0, matchIndex);
    const match = (
      suggestionValues.locationName || suggestionValues.cityName
    ).slice(matchIndex, matchIndex + locationName.length);
    const suffix = (
      suggestionValues.locationName || suggestionValues.cityName
    ).slice(matchIndex + locationName.length);
    return (
      <span>
        {prefix}
        <b>{match}</b>
        {suffix}
        <span className="cityName">
          {suggestionValues.locationName ? suggestionValues.cityName : null}
        </span>
      </span>
    );
  };

  return (
    <li onPointerDown={handleItemClick}>
      {getIcon()}
      {getBoldMatch()}
    </li>
  );
};

export default Suggestion;
