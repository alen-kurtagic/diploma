import React, { useContext } from "react";
import { AppContext } from "../../App";
import { APISuggestion } from "../../types/types";

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

  const handleItemClick = (event: React.PointerEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleInputValue(suggestionValues.ac_text);
    appContext.goToLocation({ location: suggestionValues });
    appContext.inputRef.current?.blur();
  };

  const boldMatch = () => {
    const matchIndex = suggestionValues.ac_text
      .toLowerCase()
      .indexOf(inputValue.toLowerCase());
    const prefix = suggestionValues.ac_text.slice(0, matchIndex);
    const match = suggestionValues.ac_text.slice(
      matchIndex,
      matchIndex + inputValue.length
    );
    const suffix = suggestionValues.ac_text.slice(
      matchIndex + inputValue.length
    );
    return (
      <span>
        {prefix}
        <b>{match}</b>
        {suffix}
      </span>
    );
  };

  return (
    <li onPointerDown={handleItemClick}>
      <img src="./src/assets/location.svg"></img>
      {boldMatch()}
    </li>
  );
};

export default Suggestion;
