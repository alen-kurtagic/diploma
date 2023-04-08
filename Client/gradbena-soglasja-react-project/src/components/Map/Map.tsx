import { useRef, useContext, forwardRef, useState, useEffect } from "react";
import {
  Map as ReactMap,
  GeolocateControl,
  GeolocateControlRef,
  Source,
  Layer,
  ViewStateChangeEvent,
} from "react-map-gl";
import maplibregl, { GeoJSONFeature } from "maplibre-gl";
import { AppContext } from "../../App";
import proj4 from "../../utils/projectionDefinitions";
import "maplibre-gl/dist/maplibre-gl.css";

// React functional component that uses "forwardRef" to pass reference to
// child. Accepts "props" object and "ref" reference to "MapRef" type.
const Map = () => {
  const appContext = useContext(AppContext);
  const geolocateRef = useRef<GeolocateControlRef>(null);

  // Function that geolocates the user once the map has been successfully
  // loaded.
  const handleMapLoad = (event: any) => {
    geolocateRef.current?.trigger();
  };

  const [data, setData] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  // Function that calls the API to draw layers once the user has stopped
  // moving the map.
  const handleMoveEnd = () => {
    if (!appContext.reactMapRef.current) return;
    const bounds = appContext.reactMapRef.current.getBounds();
    const point1 = proj4("EPSG:3857", "EPSG:3794", [
      bounds._sw.lng,
      bounds._sw.lat,
    ]);
    const point2 = proj4("EPSG:3857", "EPSG:3794", [
      bounds._ne.lng,
      bounds._ne.lat,
    ]);
    const bbox = [point1[0], point1[1], point2[0], point2[1]];
    const url = `https://king2.geosx.io/king/gurs/_sx1/sxtables/sxid_gurs_d96_zk_zkn/data/.json?&bbox=${bbox.join(
      ","
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const transformedFeatures = json.features.map((feature: any) => {
          const transformedCoordinates = [];

          for (let i = 0; i < feature.geometry.coordinates.length; i++) {
            const outerArray = feature.geometry.coordinates[i];
            const transformedOuterArray = [];

            for (let j = 0; j < outerArray.length; j++) {
              const innerArray = outerArray[j];
              const transformedInnerArray = proj4(
                "EPSG:3794",
                "EPSG:3857",
                innerArray
              );
              transformedOuterArray.push(transformedInnerArray);
            }
            transformedCoordinates.push(transformedOuterArray);
          }

          return {
            type: feature.type,
            id: feature.id,
            geometry: {
              type: feature.geometry.type,
              coordinates: transformedCoordinates,
            },
          };
        });
        json.features = transformedFeatures;
        setData(json);
      });
  };

  // Function that updates the map once the user has moved.
  const handleMove = (event: ViewStateChangeEvent) => {
    appContext.handleViewState(event.viewState);
  };

  const handleFeatureClick = (event: any) => {
    if (event.features == null || event.features.length == 0) {
      appContext.setSelectedFeatures([]);
      return;
    }
    const clickedFeature = event.features[0];

    if (appContext.shiftPressed.current) {
      // Create a new array in memory, since React only performs shallow
      // comparison to check if the reference to the array has changed
      // we cannot reference the old array and push new element to it.
      appContext.setSelectedFeatures([
        ...appContext.selectedFeatures,
        clickedFeature,
      ]);
    } else {
      appContext.setSelectedFeatures([clickedFeature]);
    }
  };
  const interactiveLayerIds = ["properties-fill"];

  return (
    <div className="map">
      <ReactMap
        {...appContext.viewState}
        ref={appContext.reactMapRef}
        mapLib={maplibregl}
        onLoad={handleMapLoad}
        onMove={handleMove}
        onMoveEnd={handleMoveEnd}
        mapStyle="https://api.maptiler.com/maps/728b3d85-ec90-44fc-a523-4a82941afef2/style.json?key=NnjGcTCXK5QNqcvLXvVg"
        attributionControl={false}
        interactiveLayerIds={interactiveLayerIds}
        onClick={handleFeatureClick}
        boxZoom={false}
      >
        <Source type="geojson" data={data}>
          <Layer
            id="properties-line"
            type="line"
            minzoom={14}
            paint={{
              "line-color": "rgba(180, 180, 180, 0.2)",
              "line-width": 3,
              //"fill-outline-color": "rgba(180, 180, 180, 0.5)",
            }}
          />
          <Layer
            id="properties-fill"
            type="fill"
            minzoom={14}
            paint={{
              "fill-color": "rgba(0, 0, 0, 0)",
            }}
          />
          <Layer
            id="selected-properties"
            type="fill-extrusion"
            paint={{
              "fill-extrusion-color": "#0D99FF",
              "fill-extrusion-height": 3,
              "fill-extrusion-base": 0,
            }}
            filter={[
              "any",
              [
                "in",
                ["id"],
                [
                  "literal",
                  appContext.selectedFeatures?.map(
                    (feature: any) => feature.id
                  ),
                ],
              ],
            ]}
            //beforeId="properties"
          />
        </Source>
        <GeolocateControl
          ref={geolocateRef}
          showAccuracyCircle={false}
          position="bottom-left"
        />
      </ReactMap>
    </div>
  );
};

export default Map;
