import { useContext } from "react";
import LayersItem from "../LayersItem/LayersItem";
import { TractPageContext } from "../../TractPage";
import "./layers.sass";
import { LayerProps } from "../MapLayer/MapLayer";
import { layerMapping } from "src/types/permitEnums";

const LayersPanel = () => {
  const { layers, filter } = useContext(TractPageContext);

  const filteredLayers = layers.filter((layer: LayerProps) => {
    return layer.name.toLowerCase().startsWith(filter.toLowerCase());
  });

  return (
    <div className="layers">
      {filteredLayers.map((layer: LayerProps) => {
        const layerData = layerMapping[layer.name];

        return (
          <LayersItem
            key={layer.name}
            layerData={layerData}
            name={layer.name}
            difficulty={layer.difficulty!}
            visibility={layer.visibility!}
          />
        );
      })}
    </div>
  );
};

export default LayersPanel;
