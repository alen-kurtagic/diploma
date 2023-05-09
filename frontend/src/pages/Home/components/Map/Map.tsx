import { useRef, useContext, useState } from "react";
import {
  Map as ReactMap,
  GeolocateControl,
  GeolocateControlRef,
  Source,
  Layer,
  ViewStateChangeEvent,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { AppContext } from "src/pages/Home/HomePage";
import Loading from "src/components/Loading/Loading";

import "./map.sass";
import "maplibre-gl/dist/maplibre-gl.css";
import { getParcels } from "src/services/parcels";
import proj4 from "src/utils/projectionDefinitions";

// React functional component of the Mp
const Map = () => {
  const appContext = useContext(AppContext);
  const geolocateRef = useRef<GeolocateControlRef>(null);

  // Function that geolocates the user once the map has been successfully
  // loaded.
  const handleMapLoad = (event: any) => {
    geolocateRef.current?.trigger();
    appContext.setLoading(false);
  };

  const [water, setWater] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const transformPolygonCoordinates = (
    polygon: any,
    sourceProj: string,
    destProj: string
  ) => {
    const transformedPolygon = {
      type: "Polygon",
      coordinates: polygon.coordinates.map((ring: any) =>
        ring.map((coordinate: any) => proj4(sourceProj, destProj, coordinate))
      ),
    };

    return transformedPolygon;
  };

  const [parcels, setParcels] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  // Function that calls the API to draw layers once the user has stopped
  // moving the map.
  const handleMoveEnd = async () => {
    if (!appContext.reactMapRef.current) return;

    // Get current map view state bounds
    const bounds = appContext.reactMapRef.current.getBounds();

    const bbox = [
      bounds._sw.lng,
      bounds._sw.lat,
      bounds._ne.lng,
      bounds._ne.lat,
    ];

    const parcels = await getParcels(bbox);

    setParcels(parcels);

    // water
    const point1 = [bounds._sw.lng, bounds._sw.lat];
    const point2 = [bounds._ne.lng, bounds._ne.lat];

    const transformedPoint1 = proj4("EPSG:3857", "EPSG:3794", point1);
    const transformedPoint2 = proj4("EPSG:3857", "EPSG:3794", point2);

    const bbox2 = [
      transformedPoint1[0],
      transformedPoint1[1],
      transformedPoint2[0],
      transformedPoint2[1],
    ];
    const url = `https://king2.geosx.io/gurs/_sx1/sxtables/sxid_gurs_d96_gji_vp_elek/data/.json?bbox=${bbox2.join(
      ","
    )}`;
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const features = data.features.map((feature: any) => {
      feature.geometry = transformPolygonCoordinates(
        feature.geometry,
        "EPSG:3794",
        "EPSG:3857"
      );
      return {
        ...feature,
        id: feature.properties.gid,
      };
    });

    data.features = features;

    setWater(data);
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
    <>
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
          <Source type="geojson" data={water} tolerance={0}>
            <Layer
              id="water-line"
              type="line"
              minzoom={14}
              paint={{
                "line-color": "rgba(1, 0, 0, 1)",
                "line-width": 6,
              }}
            />
          </Source>
          <Source type="geojson" data={parcels} tolerance={0}>
            <Layer
              id="properties-line"
              type="line"
              minzoom={14}
              paint={{
                "line-color": "rgba(180, 180, 180, 0.2)",
                "line-width": 3,
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
    </>
  );
};

export default Map;
