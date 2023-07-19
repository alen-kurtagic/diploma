import { useContext, useState } from "react";
import { TractPageContext } from "../../TractPage";
import "./filter.sass";

const Filter = () => {
  const tractContext = useContext(TractPageContext);

  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    tractContext.setFilter(value);
    setInputValue(value);
  };

  const handleClear = (event: React.PointerEvent<HTMLImageElement>) => {
    event.preventDefault();
    tractContext.setFilter("");
    setInputValue("");
  };

  return (
    <div className="filter-container">
      <input
        placeholder="Išči"
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
      ></input>
      <img src="src/assets/icons/search.svg" className="search-icon"></img>
      {isFocused && tractContext.filter.length > 0 && (
        <img
          src="src/assets/icons/x.svg"
          className="clear-input"
          onPointerDown={handleClear}
        ></img>
      )}
    </div>
  );
};

export default Filter;
