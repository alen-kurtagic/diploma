import "./layers-item.sass";
import Chart from "../Chart/Chart";
import { useContext, useState } from "react";
import { TractPageContext } from "../../TractPage";
import { LayerData, getLayerDataByName } from "src/types/permitEnums";

interface LayersItemProps {
  name: string;
  layerData: LayerData;
  // category: Category;
  visibility: boolean;
  difficulty: number;
  // color: string;
  // data: GeoJSON.FeatureCollection;
}

const LayersItem = ({
  name,
  layerData,
  difficulty,
  visibility,
}: LayersItemProps) => {
  const tractContext = useContext(TractPageContext);

  const [opened, setOpened] = useState<boolean>(false);
  const [isHovering, setHovering] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpened(!opened);
  };

  const handleVisibilityClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    toggleVisibility();
  };

  const handleFeatureClick = (
    event: React.MouseEvent<HTMLDivElement>,
    feature: GeoJSON.Feature
  ) => {
    tractContext.setSelectedFeatureId(feature.id);
    event.stopPropagation();
  };

  const toggleVisibility = () => {
    // Create a new array with the same values as the current state
    const newLayers = tractContext.layers.map((layer) => {
      // If the current item's category matches the category to toggle,
      // return a new object with the visibility toggled. Otherwise, return the item unchanged.
      if (layer.name === name) {
        return {
          ...layer,
          visibility: !layer.visibility,
        };
      } else {
        return layer;
      }
    });
    // Update the state with the new array
    tractContext.setLayers(newLayers);
  };

  // const numberOfFeatures: number = data.features.length;

  return (
    <div
      className={`permit-container ${opened && "opened"}`}
      // style={{ backgroundColor: `${color}50` }}
      onClick={handleClick}
      key={name}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="permit-header">
        {/* <img className="permit-icon" src={image}></img> */}
        <div className="data">
          <p
            className="title"
            // style={{ color: isHovering ? layerData.color : "#000" }}
          >
            {name}
          </p>
          <p className="subtitle">{layerData.permit || "Izbrane parcele"}</p>
          {difficulty != undefined && (
            <Chart percentage={difficulty} showText={isHovering} />
          )}
        </div>
        <div className="right">
          {/* {isHovering && visibility && (
            <div
              className="circle"
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "100%",
                backgroundColor: layerData.color,
              }}
            ></div>
          )} */}
          <img
            className="box"
            onClick={handleVisibilityClick}
            src={
              visibility
                ? "src/assets/icons/ticked.svg"
                : "src/assets/icons/unticked.svg"
            }
          />
        </div>

        {/* </div>
      <div className="permit-content">
        <p className="permit-features-title">Objekti ({numberOfFeatures})</p>
        <div className="permit-features">
          {data.features.map((feature) => (
            <div
              className="permit-feature"
              onClick={(event) =>
                handleFeatureClick(event, feature as GeoJSON.Feature)
              }
            >
              <img src={image}></img>

              <p>Objekt 1</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default LayersItem;

export type { LayersItemProps };
