import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import pako from "pako";
import { HomeContext } from "src/pages/Home/HomePage";
import "./confirm-button.sass";

// Utility function to compress and encode data
function compressData(data: string | Uint8Array | ArrayBuffer) {
  const compressedArray = pako.deflate(data);

  let binaryString = "";
  compressedArray.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  const base64String: string = window.btoa(binaryString);
  return encodeURIComponent(base64String);
}

// Function to get the right button class
function getButtonClass(isSelected: boolean) {
  return `confirm ${isSelected ? "secondaryColor" : ""}`;
}

const ConfirmButton = () => {
  const { selectedFeatures } = useContext(HomeContext);
  const navigate = useNavigate();

  const selected = selectedFeatures.length > 0;

  const handleClick = () => {
    const ids = selectedFeatures.map((feature) => feature.properties.parcel_id);

    const compressedIds = compressData(`ids=${ids.join(",")}`);

    if (selected) navigate(`/tract?${compressedIds}`);
  };

  return (
    <button className={getButtonClass(selected)} onClick={handleClick}>
      <img src="src/assets/icons/tick.svg"></img>
    </button>
  );
};

export default ConfirmButton;
