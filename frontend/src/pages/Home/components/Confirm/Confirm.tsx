import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/pages/Home/HomePage";
import pako from "pako";
import "./confirm.sass";

const Confirm = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const selected: boolean = appContext.selectedFeatures.length > 0;

  // Navigate to DetailsPage when button is clicked and feature selected
  const handleClick = () => {
    const ids: Array<string> = appContext.selectedFeatures.map(
      (feature) => feature.properties.parcel_id
    );
    // Compress the data
    const compressedIdsArray = pako.deflate(`ids=${ids.join(",")}`);

    // Convert the Uint8Array to a binary string
    let binaryString = "";
    compressedIdsArray.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });

    // Encode the binary string in Base64
    const base64String = btoa(binaryString);

    // Use encodeURIComponent on the Base64 string
    const urlSafeString = encodeURIComponent(base64String);

    if (selected) navigate(`/tract?${urlSafeString}`);
  };

  return (
    <button
      className={`confirm ${selected ? "secondaryColor" : ""}`}
      onClick={handleClick}
    >
      <img src="src/assets/tick.svg"></img>
    </button>
  );
};

export default Confirm;
