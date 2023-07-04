import { useContext } from "react";
import { Source, Layer } from "react-map-gl";
import { Category, categoryMapping } from "src/types/permitEnums";
import { TractPageContext } from "../../TractPage";

interface PermitSourceProps {
  category: Category;
  visibility: boolean;
  height: number;
  data: GeoJSON.FeatureCollection;
}

const PermitSource = ({
  category,
  visibility,
  height,
  data,
}: PermitSourceProps) => {
  const tractContext = useContext(TractPageContext);

  const color = categoryMapping[category].color;

  return (
    <Source
      key={category + "Selected"}
      type="geojson"
      data={data}
      tolerance={0}
    >
      <Layer
        id={category + "Selected"}
        type="fill-extrusion"
        paint={{
          "fill-extrusion-color": color,
          "fill-extrusion-height": height,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 1,
        }}
        filter={["==", "id", tractContext.selectedFeatureId ?? "0"]}
        //beforeId="properties"
      />
      <Layer
        id={category}
        type="fill-extrusion"
        paint={{
          "fill-extrusion-color": color,
          "fill-extrusion-height": height,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": visibility ? 0.5 : 0,
        }}
      />
    </Source>
  );
};

export default PermitSource;
