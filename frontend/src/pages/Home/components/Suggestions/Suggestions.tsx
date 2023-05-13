import React from "react";
import Suggestion from "../Suggestion/Suggestion";
import { APISuggestion } from "src/types/apiTypes";
import "./suggestions.sass";

type SuggestionsProps = {
  suggestions: APISuggestion[];
  handleInputValue: (value: string) => void;
  inputValue: string;
};

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  handleInputValue,
  inputValue,
}) => {
  return (
    <ul className="suggestions-container">
      {suggestions.map((suggestionValues: APISuggestion) => (
        <Suggestion
          key={suggestionValues.ac_text}
          suggestionValues={suggestionValues}
          handleInputValue={handleInputValue}
          inputValue={inputValue}
        ></Suggestion>
      ))}
    </ul>
  );
};

export default Suggestions;
