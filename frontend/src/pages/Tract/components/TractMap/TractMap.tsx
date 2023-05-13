import { useContext, useState, useEffect } from "react";
import {
  Map as ReactMap,
  Source,
  Layer,
  ViewStateChangeEvent,
  MapboxEvent,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { TractPageContext } from "src/pages/Tract/TractPage";
import bbox from "@turf/bbox";
import "./tract-map.sass";
import "maplibre-gl/dist/maplibre-gl.css";
import { BBox } from "@turf/turf";
import { getParcelsByIds } from "src/services/database/parcel";
import { getSettlementByCode } from "src/services/database/settlement";
import { TractLayers } from "src/types/tractTypes";
import { APISettlement } from "src/types/apiTypes";
import { getCulture } from "src/services/api/culture";

// React functional component of the Mp
const TractMap = () => {
  const tractContext = useContext(TractPageContext);

  const [maxBounds, setMaxBounds] = useState<null | number[][]>(null);

  // Function that fits the map view to the selected tract.
  const handleMapLoad = (event: MapboxEvent) => {
    const padding = 125; // fit bounds padding in pixels

    const bounds: BBox = bbox({
      type: "FeatureCollection",
      features: tractContext.layers.parcel.data.features,
    });

    event.target.fitBounds(bounds as [number, number, number, number], {
      padding: padding,
    });

    event.target.once("zoomend", function () {
      handleMaxBounds(bounds);
    });

    tractContext.setLoading(false);
  };

  // Function that updates the map once the user has moved.
  const handleMove = (event: ViewStateChangeEvent) => {
    tractContext.handleViewState(event.viewState);
  };

  const handleMaxBounds = (bounds: BBox) => {
    const ratio = 10; // ratio that represents max bounds size to the tract size

    const lngDiff: number = bounds[2] - bounds[0]; // width
    const latDiff = bounds[3] - bounds[1]; // height

    const a: number = Math.max(lngDiff, latDiff) * ratio;

    const expandedBounds = [
      [bounds[0] - (a - lngDiff) / 2, bounds[1] - (a - latDiff) / 2],
      [bounds[2] + (a - lngDiff) / 2, bounds[3] + (a - latDiff) / 2],
    ];

    // Set the expanded bounds as the maxBounds property
    setMaxBounds(expandedBounds);
  };
  useEffect(() => {
    let abort = false;

    const fetchData = async () => {
      if (abort) return;

      const newLayers: TractLayers = tractContext.layers;

      const parcels = await getParcelsByIds(tractContext.ids!);
      newLayers.parcel.data = parcels;

      const tractBounds: BBox = bbox(parcels) as BBox;
      const culture = await getCulture(tractBounds);
      newLayers.culture.data = culture;

      tractContext.setLayers(newLayers);

      const codes: Array<number> = parcels.features.map(
        (feature) => feature.properties?.ko_id
      );
      const settlements: Array<string> = await getSettlementByCode(codes);

      tractContext.setSettlements(settlements);
    };

    fetchData();

    return () => {
      abort = true;
    };
  }, []);

  const interactiveLayerIds = ["properties-fill"];

  console.log(tractContext.layers.culture.visibility);

  return (
    <div className="tract-map">
      <ReactMap
        {...tractContext.viewState}
        ref={tractContext.reactMapRef}
        mapLib={maplibregl}
        onMove={handleMove}
        onLoad={handleMapLoad}
        mapStyle="https://api.maptiler.com/maps/728b3d85-ec90-44fc-a523-4a82941afef2/style.json?key=NnjGcTCXK5QNqcvLXvVg"
        attributionControl={false}
        interactiveLayerIds={interactiveLayerIds}
        boxZoom={false}
        maxBounds={maxBounds}
      >
        <Source
          type="geojson"
          data={tractContext.layers.parcel.data}
          tolerance={0}
        >
          <Layer
            id="selected-properties"
            type="fill-extrusion"
            paint={{
              "fill-extrusion-color": "#0D99FF",
              "fill-extrusion-height": 3,
              "fill-extrusion-base": 0,
            }}
            filter={["any", ["in", ["id"], ["literal", tractContext.ids]]]}
            //beforeId="properties"
          />
        </Source>

        <Source
          type="geojson"
          data={tractContext.layers.culture.data}
          tolerance={0}
        >
          <Layer
            id="culture"
            type="fill-extrusion"
            paint={{
              "fill-extrusion-color": "#ADD8E6",
              "fill-extrusion-height": 1,
              "fill-extrusion-base": 0,
              "fill-extrusion-opacity": tractContext.layers.culture.visibility
                ? 1
                : 0,
            }}
            //beforeId="properties"
          />
        </Source>
      </ReactMap>
    </div>
  );
};

export default TractMap;
