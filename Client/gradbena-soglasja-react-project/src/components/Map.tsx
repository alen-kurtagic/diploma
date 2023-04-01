import react, { useState, useEffect, useRef, useCallback } from "react";
import {
  Map as ReactGlMap,
  GeolocateControl,
  GeolocateControlRef,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = () => {
  // Map view state
  const [viewState, setViewState] = useState({
    latitude: 46.1492,
    longitude: 14.9860106,
    zoom: 7,
  });

  // Geolocate reference
  const geolocateRef = useRef<GeolocateControlRef>(null);

  // Zoom in on user location on map load
  const handleMapLoad = (event: any) => {
    geolocateRef.current?.trigger();
  };

  return (
    <div className="map">
      <ReactGlMap
        onLoad={handleMapLoad}
        {...viewState}
        mapLib={maplibregl}
        attributionControl={false}
        onMove={(evt: any) => setViewState(evt.viewState)}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=NnjGcTCXK5QNqcvLXvVg"
      >
        <GeolocateControl ref={geolocateRef} />
      </ReactGlMap>
    </div>
  );
};

export default Map;
