import { TractPageContext } from "src/pages/Tract/TractPage";
import SurfaceArea from "../SurfaceArea/SurfaceArea";
import { useContext } from "react";
import "./header.sass";
import {
  capitalizeFirstLetter,
  replaceLastCommaWithAnd,
} from "src/utils/stringManipulation";

const Header = () => {
  const appContext = useContext(TractPageContext);

  const settlementNames = appContext.fetchedData!.tract.settlementNames!;
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
