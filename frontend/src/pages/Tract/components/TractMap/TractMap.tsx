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
import { getTract } from "src/services/tract";

// React functional component of the Mp
const TractMap = () => {
  const appContext = useContext(TractPageContext);

  const [maxBounds, setMaxBounds] = useState<null | number[][]>(null);

  // Function that fits the map view to the selected tract.
  const handleMapLoad = (event: MapboxEvent) => {
    const padding = 125; // fit bounds padding in pixels

    const bounds: BBox = bbox({
      type: "FeatureCollection",
      features: appContext.fetchedData?.tract.geoJson?.features,
    });

    event.target.fitBounds(bounds as [number, number, number, number], {
      padding: padding,
    });

    event.target.once("zoomend", function () {
      handleMaxBounds(bounds);
    });

    appContext.setLoading(false);
  };

  // Function that updates the map once the user has moved.
  const handleMove = (event: ViewStateChangeEvent) => {
    appContext.handleViewState(event.viewState);
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
    getTract(appContext.ids!).then((tract) => {
      appContext.setFetchedData(tract);
    });
  }, []);

  const interactiveLayerIds = ["properties-fill"];

  return (
    <div className="tract-map">
      <ReactMap
        {...appContext.viewState}
        ref={appContext.reactMapRef}
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
          data={appContext.fetchedData?.tract.geoJson}
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
            filter={["any", ["in", ["id"], ["literal", appContext.ids]]]}
            //beforeId="properties"
          />
        </Source>
      </ReactMap>
    </div>
  );
};

export default TractMap;
