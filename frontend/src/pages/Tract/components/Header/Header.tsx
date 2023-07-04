import { useContext, useState } from "react";
import {
  capitalizeFirstLetter,
  replaceLastCommaWithAnd,
} from "src/utils/stringManipulation";
import { TractPageContext } from "src/pages/Tract/TractPage";
import "./header.sass";
import Share from "../Share/Share";
import Save from "../Save/Save";

const Header = () => {
  const tractContext = useContext(TractPageContext);

  console.log(tractContext.tract);
  const settlementNames = tractContext.settlements;
  const settlementNamesCapitalized = settlementNames.map((settlementName) =>
    capitalizeFirstLetter(settlementName)
  );
  const settlementNamesAnd = replaceLastCommaWithAnd(
    settlementNamesCapitalized.join(", ")
  );

  const settlementName: string = settlementNamesAnd;

  const streetNames = tractContext.streets;

  const streetName = streetNames[0];

  const [expandedState, setExpandedState] = useState<"share" | "save" | null>(
    null
  );

  const toggleShare = () => {
    setExpandedState((prev) => (prev === "share" ? null : "share"));
  };

  const toggleSave = () => {
    setExpandedState((prev) => (prev === "save" ? null : "save"));
  };

  return (
    <div className="header">
      <h2 className="settlement">{settlementName}</h2>
      <h3 className="street">{streetName}</h3>
      {/* <div className="usage">
        <img src="src/assets/wheat.svg" />
      </div> */}
      <div className="actions">
        <div className="action" onClick={() => toggleSave()}>
          <img src="./src/assets/flag.svg" />
          <p>Shrani</p>
        </div>
        <div className="action" onClick={() => toggleShare()}>
          <img src="./src/assets/share.svg" />
          <p>Deli</p>
        </div>
      </div>
      {expandedState == "share" && <Share />}
      {expandedState == "save" && (
        <Save suggested={`${settlementName} - ${streetName}`} />
      )}
    </div>
  );
};

export default Header;
