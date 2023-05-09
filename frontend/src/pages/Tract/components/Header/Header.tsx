import Search from "../../../Home/components/Search/Search";
import { TractPageContext } from "src/pages/Tract/TractPage";
import "./header.sass";
import { useContext } from "react";
import SurfaceArea from "../SurfaceArea/SurfaceArea";

const Header = () => {
  const appContext = useContext(TractPageContext);

  function capitalizeFirstLetter(str: string): string {
    const lowercase: string = str.toLowerCase();
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
  }

  const title: string =
    appContext.fetchedData?.settlement.join(", ") || "Neznano";
  const subtitle: string = "-".toString();

  return (
    <div className="header">
      <span className="titles">
        <h2>{capitalizeFirstLetter(title)}</h2>
        <p>Gradnja na tem zemljišču zahteva {subtitle} soglasij</p>
      </span>
      {/* <SurfaceArea></SurfaceArea> */}
    </div>
  );
};

export default Header;
