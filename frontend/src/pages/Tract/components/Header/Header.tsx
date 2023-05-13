import { TractPageContext } from "src/pages/Tract/TractPage";
// import SurfaceArea from "../SurfaceArea/SurfaceArea";
import { useContext } from "react";
import {
  capitalizeFirstLetter,
  replaceLastCommaWithAnd,
} from "src/utils/stringManipulation";
import "./header.sass";

const Header = () => {
  const tractContext = useContext(TractPageContext);

  const settlementNames = tractContext.settlements;
  const settlementNamesCapitalized = settlementNames.map((settlementName) =>
    capitalizeFirstLetter(settlementName)
  );
  const settlementNamesAnd = replaceLastCommaWithAnd(
    settlementNamesCapitalized.join(", ")
  );

  const title: string = settlementNamesAnd;

  const subtitle: string = "x".toString();

  return (
    <div className="header">
      <span className="titles">
        <h2>{title}</h2>
        <p>Gradnja na tem zemljišču zahteva {subtitle} soglasij</p>
      </span>
      {/* <SurfaceArea></SurfaceArea> */}
    </div>
  );
};

export default Header;
