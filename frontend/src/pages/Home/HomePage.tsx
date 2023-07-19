import { useState, createContext, useRef, useCallback, useEffect } from "react";
import { MapRef, ViewState } from "react-map-gl";
import { Dispatch, RefObject, SetStateAction } from "react";
import proj4 from "src/utils/projectionDefinitions";
import InteractiveMap from "./components/InteractiveMap/InteractiveMap";
import ConfirmButton from "./components/ConfirmButton/ConfirmButton";
import SearchBar from "./components/SearchBar/SearchBar";
import Loading from "src/components/Loading/Loading";
import { SuggestionValues } from "src/services/api/suggestions/suggestion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home-page.sass";

interface HomePageState {
  viewState: any;
  handleViewState: (newViewState: Partial<ViewState>) => void;
  goToLocation: ({ location }: { location: SuggestionValues }) => void;
  // reactMapRef: MapRef | null,
  reactMapRef: any;
  inputRef: RefObject<HTMLInputElement>;
  selectedFeatures: Array<any>;
  setSelectedFeatures: Dispatch<SetStateAction<any>>;
  shiftPressed: RefObject<boolean>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// "goTo" function.
interface goToParams {
  box: [number, number, number, number];
  maxZoom: number;
  duration: number;
}

const createIntitialHomePageState = () => {
  return {
    viewState: {},
    handleViewState: (newViewState: Partial<ViewState>) => {},
    goToLocation: ({ location }: { location: SuggestionValues }) => {},
    reactMapRef: null,
    inputRef: { current: null },
    selectedFeatures: [],
    setSelectedFeatures: () => {},
    shiftPressed: { current: null },
    loading: true,
    setLoading: () => {},
  };
};

const HomeContext = createContext<HomePageState>(createIntitialHomePageState());

const HomePage = () => {
  const reactMapRef = useRef<MapRef>(null);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Array<any>>([]);
  const shiftPressed = useRef<boolean>(false);
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: 46.1491664,
    longitude: 14.9860106,
    zoom: 7,
  });

  // handlers and callbacks
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setSelectedFeatures([]);
    if (event.key == "Shift") shiftPressed.current = true;
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key == "Shift") shiftPressed.current = false;
  }, []);

  const handleViewState = useCallback((newViewState: Partial<ViewState>) => {
    setViewState((prevViewState) => ({ ...prevViewState, ...newViewState }));
  }, []);

  const goToLocation = useCallback(
    ({ location }: { location: SuggestionValues }) => {
      const point1 = proj4("EPSG:3794", "EPSG:3857", [
        location.boundingBox.x1,
        location.boundingBox.y1,
      ]);
      const point2 = proj4("EPSG:3794", "EPSG:3857", [
        location.boundingBox.x2,
        location.boundingBox.y2,
      ]);
      const box: [number, number, number, number] = [
        point1[0],
        point1[1],
        point2[0],
        point2[1],
      ];
      goTo({ box, maxZoom: 18, duration: 2000 });
    },
    []
  );

  const goTo = useCallback(({ box, maxZoom, duration }: goToParams) => {
    reactMapRef.current?.fitBounds(box, { maxZoom, duration });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeydown, handleKeyUp]);

  const selected: boolean = selectedFeatures.length > 0;

  return (
    <HomeContext.Provider
      value={{
        viewState,
        handleViewState,
        goToLocation,
        reactMapRef,
        inputRef,
        selectedFeatures,
        setSelectedFeatures,
        shiftPressed,
        loading,
        setLoading,
      }}
    >
      <div className="home-page">
        {loading && <Loading />}
        <SearchBar />
        <InteractiveMap />
        {selected && <ConfirmButton />}
      </div>
    </HomeContext.Provider>
  );
};

export default HomePage;

export { HomeContext };
