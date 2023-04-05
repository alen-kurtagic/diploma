import { useState, createContext, useRef, useCallback } from "react";
import Map from "./components/Map/Map";
import "./App.sass";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Confirm from "./components/Confirm/Confirm";
import { Map as ReactGlMap, MapRef } from "react-map-gl";

export const ViewStateContext = createContext({
  viewState: {},
  handleViewState: (newViewState: any) => {},
  flyTo: ({ point1, point2 }: { point1: number[]; point2: number[] }) => {},
});

function App() {
  const mapRef = useRef<MapRef>(null);

  // Map view state
  const [viewState, setViewState] = useState({
    latitude: 46.1492,
    longitude: 14.9860106,
    zoom: 7,
  });

  const flyTo = useCallback(
    ({ point1, point2 }: { point1: number[]; point2: number[] }) => {
      mapRef.current?.fitBounds([point1[0], point1[1], point2[0], point2[1]], {
        maxZoom: 18,
        duration: 2000,
      });
    },
    []
  );

  function handleViewState(newViewState: any) {
    setViewState({ ...viewState, ...newViewState });
  }
  return (
    <ViewStateContext.Provider value={{ viewState, handleViewState, flyTo }}>
      <Header></Header>
      <Map ref={mapRef}></Map>
      <Confirm></Confirm>
    </ViewStateContext.Provider>
  );
}

export default App;
