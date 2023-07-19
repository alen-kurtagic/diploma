import React from "react";
import SuggestionItem from "../SuggestionItem/SuggestionItem";
import { SuggestionValues } from "src/services/api/suggestions/suggestion";
import "./suggestion-list.sass";

interface SuggestionListProps {
  suggestions: SuggestionValues[];
  handleSuggestionClick: (value: string) => void;
  userInput: string;
}

const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestions,
  handleSuggestionClick,
  userInput,
}) => {
  return (
    <ul className="suggestion-list">
      {suggestions.map((suggestion: SuggestionValues) => (
        <SuggestionItem
          key={suggestion.text}
          suggestion={suggestion}
          handleSuggestionClick={handleSuggestionClick}
          userInput={userInput}
        />
      ))}
    </ul>
  );
};

export default SuggestionList;
