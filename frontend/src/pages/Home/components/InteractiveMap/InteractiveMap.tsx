import { useRef, useContext, useState } from "react";
import {
  Map as ReactMap,
  GeolocateControl,
  Source,
  Layer,
  GeolocateControlRef,
  ViewStateChangeEvent,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { HomeContext } from "src/pages/Home/HomePage";
import { getParcelsByBBox } from "src/services/database/parcel";
import "maplibre-gl/dist/maplibre-gl.css";
import "./interactive-map.sass";

const InteractiveMap = () => {
  const {
    viewState,
    setLoading,
    reactMapRef,
    handleViewState,
    selectedFeatures,
    setSelectedFeatures,
    shiftPressed,
  } = useContext(HomeContext);
  const geolocateRef = useRef<GeolocateControlRef>(null);
  const [parcels, setParcels] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const handleMapLoad = () => {
    geolocateRef.current?.trigger();
    setLoading(false);
  };

  const getMapViewBounds = () => {
    if (!reactMapRef.current) return;

    const bounds = reactMapRef.current.getBounds();
    return [bounds._sw.lng, bounds._sw.lat, bounds._ne.lng, bounds._ne.lat];
  };

  const handleMove = (event: ViewStateChangeEvent) => {
    handleViewState(event.viewState);
  };

  const handleMoveEnd = async () => {
    const bbox = getMapViewBounds();
    if (!bbox) return;

    const fetchedParcels = await getParcelsByBBox(bbox);
    setParcels(fetchedParcels);
  };

  const handleFeatureClick = (event: any) => {
    const clickedFeature = event.features?.[0];
    if (!clickedFeature) {
      setSelectedFeatures([]);
      return;
    }

    const newSelectedFeatures = shiftPressed.current
      ? [...selectedFeatures, clickedFeature]
      : [clickedFeature];

    setSelectedFeatures(newSelectedFeatures);
  };

  return (
    <div className="map">
      <ReactMap
        {...viewState}
        ref={reactMapRef}
        mapLib={maplibregl}
        onLoad={handleMapLoad}
        onMove={handleMove}
        onMoveEnd={handleMoveEnd}
        mapStyle="https://api.maptiler.com/maps/728b3d85-ec90-44fc-a523-4a82941afef2/style.json?key=NnjGcTCXK5QNqcvLXvVg"
        attributionControl={false}
        interactiveLayerIds={["properties-fill"]}
        onClick={handleFeatureClick}
        boxZoom={false}
      >
        <Source type="geojson" data={parcels} tolerance={0}>
          <Layer
            id="properties-line"
            type="line"
            minzoom={14}
            paint={{
              "line-color": "rgba(200, 200, 200, 0.2)",
              "line-width": 2.5,
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
                ["get", "id"],
                [
                  "literal",
                  selectedFeatures?.map(
                    (feature: any) => feature.properties.id
                  ),
                ],
              ],
            ]}
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

export default InteractiveMap;
