import { useContext } from "react";
import { Source, Layer } from "react-map-gl";
import { TractPageContext } from "../../TractPage";
import { getLayerDataByName } from "src/types/permitEnums";

interface LayerProps {
  name: string;
  color?: string;
  opacity?: number;
  visibility?: boolean;
  difficulty?: number;
  authority?: string;
  height?: number;
  data: GeoJSON.FeatureCollection;
  regNo?: number;
}

const MapLayer = ({
  name,
  opacity = 0.4,
  visibility,
  height,
  data,
}: LayerProps) => {
  const tractContext = useContext(TractPageContext);

  const layerData = getLayerDataByName(name);

  // Get an array of the IDs of the features in popups
  const selectedFeatureIds = tractContext.popups.map(
    (popup: any) => popup.feature.properties.id
  );

  return (
    <Source key={name + "Selected"} type="geojson" data={data} tolerance={0}>
      <Layer
        id={name}
        type="fill-extrusion"
        paint={{
          "fill-extrusion-color": layerData!.color,
          "fill-extrusion-height": [
            "case",
            ["in", ["get", "id"], ["literal", selectedFeatureIds]],
            height == 0 ? 0 : height! + 4,
            height,
          ],
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": visibility ? opacity : 0,
        }}
      />
    </Source>
  );
};

export default MapLayer;

export type { LayerProps };
