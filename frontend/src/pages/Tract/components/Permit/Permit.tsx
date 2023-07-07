import "./permit.sass";
import Chart from "../Chart/Chart";
import { useContext, useState } from "react";
import { TractPageContext } from "../../TractPage";
import { categoryMapping } from "src/types/permitEnums";
import { PermitLayer } from "src/types/tractTypes";

const Permit = ({ category, visibility, difficulty, data }: PermitLayer) => {
  const tractContext = useContext(TractPageContext);

  const { title, permits, image, color } = categoryMapping[category];

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
    const newPermitLayers = tractContext.permitLayers.map((permitLayer) => {
      // If the current item's category matches the category to toggle,
      // return a new object with the visibility toggled. Otherwise, return the item unchanged.
      if (permitLayer.category === category) {
        return {
          ...permitLayer,
          visibility: !permitLayer.visibility,
        };
      } else {
        return permitLayer;
      }
    });

    // Update the state with the new array
    tractContext.setPermitLayers(newPermitLayers);
  };

  const numberOfFeatures: number = data.features.length;

  return (
    <div
      className={`permit-container ${opened && "opened"}`}
      onClick={handleClick}
      key={category}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="permit-header">
        {/* <img className="permit-icon" src={image}></img> */}
        <div className="data">
          <p className="title">{title}</p>
          {/* <p className="subtitle">{permits.join(", ")}</p> */}
          <Chart difficulty={difficulty} showText={isHovering} />
        </div>
        <img
          className="box"
          onClick={handleVisibilityClick}
          src={visibility ? "src/assets/ticked.svg" : "src/assets/unticked.svg"}
        ></img>
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

export default Permit;
