import React, { useContext } from "react";
import { APIAutocompleteItem } from "../../api/autocomplete";
import { ViewStateContext } from "../../App";
import proj4 from "../../utils/projection-definitions";

type AutocompleteItemProps = {
  suggestionValues: APIAutocompleteItem;
  handleInputValue: (value: string) => void;
};

const AutocompleteItem: React.FC<AutocompleteItemProps> = ({
  suggestionValues,
  handleInputValue,
}) => {
  const viewStateContext = useContext(ViewStateContext);

  const handleItemClick = (event: React.PointerEvent<HTMLLIElement>) => {
    event.preventDefault();
    handleInputValue(suggestionValues.ac_text);
    console.log(suggestionValues);

    const point1 = proj4("EPSG:3794", "EPSG:3857", [
      suggestionValues.x1,
      suggestionValues.y1,
    ]);
    const point2 = proj4("EPSG:3794", "EPSG:3857", [
      suggestionValues.x2,
      suggestionValues.y2,
    ]);
    const midPoint = [(point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2];
    console.log(point1);
    // viewStateContext.handleViewState({
    //   latitude: midPoint[1],
    //   longitude: midPoint[0],
    // });
    viewStateContext.flyTo({
      point1: point1,
      point2: point2,
    });
  };

  return (
    <li onPointerDown={handleItemClick}>
      <img src="./src/assets/location.svg"></img>
      {suggestionValues.ac_text}
    </li>
  );
};

export default AutocompleteItem;
