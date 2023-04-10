import { useState, createContext, useRef, useCallback, useEffect } from "react";
import { Map as ReactMap, MapRef, ViewState } from "react-map-gl";
import proj4 from "./utils/projectionDefinitions";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Confirm from "./components/Confirm/Confirm";
import { APISuggestion, AppState, goToParams } from "./types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.sass";

// Context object that will be used to share the state used
// in children of this Component.
export const AppContext = createContext<AppState>({
  viewState: {},
  handleViewState: (newViewState: Partial<ViewState>) => {},
  goToLocation: ({ location }: { location: APISuggestion }) => {},
  reactMapRef: null,
  inputRef: { current: null },
  selectedFeatures: [],
  setSelectedFeatures: () => {},
  shiftPressed: { current: null },
});

function App() {
  // Create a reference to Maplibre map instance using useRef hook.
  const reactMapRef = useRef<MapRef>(null);

  // Create a reference to Search component input element, to track user input
  // for suggestions related components.
  const inputRef = useRef<HTMLInputElement>(null);

  // Create a state of currently selected features to change the color of
  // Confirm component button if there are any selected.
  const [selectedFeatures, setSelectedFeatures] = useState<Array<any>>([]);

  let shiftPressed = useRef<boolean>(false);

  // Partial is a utility type that makes all properties of a given type
  //  optional and not neccesseraly required.
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: 46.1491664,
    longitude: 14.9860106,
    zoom: 7,
  });

  // Function that globally handles "keydown" events.
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedFeatures([]);
    }
    if (event.key == "Shift") {
      shiftPressed.current = true;
    }
  };

  // Function that globally handles "keyup" events.
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key == "Shift") {
      shiftPressed.current = false;
    }
  };

  // Add global event listeners for "keydown" and "keyup" events to the document,
  // and removfe them when the component unmounts.
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleViewState = (newViewState: Partial<ViewState>) => {
    setViewState({ ...viewState, ...newViewState });
  };

  // Memoized function that takes location's boundary box and calls the
  // "goTo" function.
  const goToLocation = useCallback(
    ({ location }: { location: APISuggestion }) => {
      const point1 = proj4("EPSG:3794", "EPSG:3857", [
        location.x1,
        location.y1,
      ]);
      const point2 = proj4("EPSG:3794", "EPSG:3857", [
        location.x2,
        location.y2,
      ]);
      const box: [number, number, number, number] = [
        point1[0],
        point1[1],
        point2[0],
        point2[1],
      ];
      goTo({ box: box, maxZoom: 18, duration: 2000 });
    },
    []
  );
  // Memoized function that animates the transition to a certain boundary box.
  const goTo = useCallback(({ box, maxZoom, duration }: goToParams) => {
    reactMapRef.current?.fitBounds(box, {
      maxZoom: maxZoom,
      duration: duration,
    });
  }, []);

  return (
    // Provider component that provides viewState, handleViewState, and
    // goToLocation properties to all descendants of this component
    // that consume the App context.
    <AppContext.Provider
      value={{
        viewState,
        handleViewState,
        goToLocation,
        reactMapRef,
        inputRef,
        selectedFeatures,
        setSelectedFeatures,
        shiftPressed,
      }}
    >
      <Header></Header>
      <Map></Map>
      <Confirm></Confirm>
    </AppContext.Provider>
  );
}

export default App;
