import React, { useContext } from "react";
import { AppContext } from "../../App";

const Confirm = () => {
  const appContext = useContext(AppContext);

  return (
    <button
      className={`confirm ${
        appContext.selectedFeatures.length > 0 ? "secondaryColor" : ""
      }`}
    >
      <img src="src/assets/tick.svg"></img>
    </button>
  );
};

export default Confirm;
