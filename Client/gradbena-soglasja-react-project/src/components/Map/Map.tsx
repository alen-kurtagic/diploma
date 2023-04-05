import react, { useState, useRef, useContext, forwardRef } from "react";
import {
  Map as ReactGlMap,
  GeolocateControl,
  GeolocateControlRef,
  MapRef,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ViewStateContext } from "../../App";

const Map = forwardRef<MapRef, {}>(function Map(props, ref) {
  const viewStateContext = useContext(ViewStateContext);
  // Geolocate reference
  const geolocateRef = useRef<GeolocateControlRef>(null);

  // Zoom in on user location on map load
  const handleMapLoad = (event: any) => {
    geolocateRef.current?.trigger();
  };

  return (
    <div className="map">
      <ReactGlMap
        ref={ref}
        onLoad={handleMapLoad}
        {...viewStateContext.viewState}
        mapLib={maplibregl}
        attributionControl={false}
        onMove={(evt: any) => viewStateContext.handleViewState(evt.viewState)}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=NnjGcTCXK5QNqcvLXvVg"
      >
        <GeolocateControl
          ref={geolocateRef}
          position="bottom-left"
          // style={{
          //   position: "absolute",
          //   bottom: "5px",
          //   left: "5px",
          // }}
        />
      </ReactGlMap>
    </div>
  );
});

export default Map;
