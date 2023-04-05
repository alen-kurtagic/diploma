import React, { useState } from "react";
import AutocompleteSuggestion from "./AutocompleteItem";
import { APIAutocompleteItem } from "../../api/autocomplete";

type AutocompleteProps = {
  autocompleteSuggestions: APIAutocompleteItem[];
  handleInputValue: (value: string) => void;
  className: string;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  autocompleteSuggestions,
  className,
  handleInputValue,
}) => {
  return (
    <ul className={className}>
      {autocompleteSuggestions.map((suggestionValues: APIAutocompleteItem) => (
        <AutocompleteSuggestion
          suggestionValues={suggestionValues}
          handleInputValue={handleInputValue}
        ></AutocompleteSuggestion>
      ))}
    </ul>
  );
};

export default Autocomplete;
