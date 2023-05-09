import React from "react";
import Suggestion from "./Suggestion";
import { APISuggestion } from "src/types/types";

type SuggestionsProps = {
  suggestions: APISuggestion[];
  handleInputValue: (value: string) => void;
  className: string;
  inputValue: string;
};

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  className,
  handleInputValue,
  inputValue,
}) => {
  console.log("test");

  return (
    <ul className={className}>
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
