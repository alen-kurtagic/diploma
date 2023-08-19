import pako from "pako";
import Navigation from "./components/Navigation/Navigation";
import TractMap from "./components/TractMap/TractMap";
import Loading from "src/components/Loading/Loading";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { MapRef, ViewState } from "react-map-gl";
import { useLocation } from "react-router-dom";
import Side from "./components/SidePanel/SidePanel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tract-page.sass";
import { LayerProps } from "./components/MapLayer/MapLayer";
import { getLayerDataByName } from "src/types/permitEnums";
import { TractApiGeoJSON } from "src/services/api/parcels/parcel";

interface TractPageState {
  viewState: any;
  handleViewState: (newViewState: Partial<ViewState>) => void;
  reactMapRef: any;
  ids: Array<string> | undefined;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  tract: GeoJSON.FeatureCollection;
  setTract: (tract: GeoJSON.FeatureCollection) => void;
  neighbours: GeoJSON.FeatureCollection;
  setNeighbours: (neigbours: GeoJSON.FeatureCollection) => void;
  neighboursApi: TractApiGeoJSON;
  setNeighboursApi: (neigboursApi: TractApiGeoJSON) => void;
  tractApi: TractApiGeoJSON;
  setTractApi: (tractApi: TractApiGeoJSON) => void;
  layers: LayerProps[];
  setLayers: (newLayers: Array<any>) => void;
  settlements: Array<string>;
  setSettlements: (newSettlements: Array<string>) => void;
  streets: Array<string>;
  setStreets: (newSettlements: Array<string>) => void;
  filter: string;
  setFilter: (newFilter: string) => void;
  selectedFeatureId: any;
  setSelectedFeatureId: (newSelectedFeatureId: any) => void;
  popups: any;
  setPopups: (newPopups: any) => void;
}

// create initial state for TractPageContext
const createInitialTractPageState = (): TractPageState => {
  return {
    viewState: {},
    handleViewState: () => {},
    reactMapRef: null,
    ids: undefined,
    loading: true,
    setLoading: () => {},
    tract: {
      type: "FeatureCollection",
      features: [],
    },
    setTract: () => {},
    neighbours: {
      type: "FeatureCollection",
      features: [],
    },
    setNeighbours: () => {},
    tractApi: {
      type: "FeatureCollection",
      features: [],
    },
    setTractApi: () => {},
    neighboursApi: {
      type: "FeatureCollection",
      features: [],
    },
    setNeighboursApi: () => {},
    layers: [],
    setLayers: () => {},
    settlements: [],
    setSettlements: () => {},
    streets: [],
    setStreets: () => {},
    filter: "",
    setFilter: () => {},
    selectedFeatureId: undefined,
    setSelectedFeatureId: () => {},
    popups: [],
    setPopups: () => {},
  };
};

const TractPageContext = createContext<TractPageState>(
  createInitialTractPageState()
);

// decode URL parameters
function decodeURLParameters(encodedB64: string): string {
  const decodedB64 = decodeURIComponent(encodedB64);
  const compressedData = Uint8Array.from(atob(decodedB64), (c) =>
    c.charCodeAt(0)
  );
  return pako.inflate(compressedData, { to: "string" });
}

const TractPage = () => {
  const location = useLocation();
  const decompressedParams = decodeURLParameters(location.search.substring(1));
  const params = new URLSearchParams(decompressedParams);
  const idsParam = params.get("ids");
  const ids: Array<string> | undefined = idsParam?.split(",");

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<string>("");

  const [tract, setTract] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const [neighbours, setNeighbours] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const [tractApi, setTractApi] = useState<TractApiGeoJSON>({
    type: "FeatureCollection",
    features: [],
  });

  const [neighboursApi, setNeighboursApi] = useState<TractApiGeoJSON>({
    type: "FeatureCollection",
    features: [],
  });

  const [layers, setLayers] = useState<Array<any>>([]);
  const [popups, setPopups] = useState([]);

  const [settlements, setSettlements] = useState<Array<string>>([]);
  const [streets, setStreets] = useState<Array<string>>([]);
  const [selectedFeatureId, setSelectedFeatureId] = useState<
    number | undefined
  >(undefined);

  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: 46.1491664,
    longitude: 14.9860106,
    zoom: 7,
  });

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setPopups([]);
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {}, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeydown, handleKeyUp]);

  const handleViewState = (newViewState: Partial<ViewState>) => {
    setViewState({ ...viewState, ...newViewState });
  };

  useEffect(() => {
    // Reset the state to its initial values when the route changes
    console.log("resetting");
    setLoading(true);
    setFilter("");
    setTract({
      type: "FeatureCollection",
      features: [],
    });
    setNeighbours({
      type: "FeatureCollection",
      features: [],
    });
    setTractApi({
      type: "FeatureCollection",
      features: [],
    });
    setLayers([]);
    setPopups([]);
    setSettlements([]);
    setStreets([]);
    setSelectedFeatureId(undefined);
    setViewState({
      latitude: 46.1491664,
      longitude: 14.9860106,
      zoom: 7,
    });
  }, [location]);

  const reactMapRef = useRef<MapRef>(null);

  return (
    <TractPageContext.Provider
      value={{
        viewState,
        handleViewState,
        reactMapRef,
        ids,
        loading,
        setLoading,
        tract,
        setTract,
        neighbours,
        setNeighbours,
        tractApi,
        setTractApi,
        neighboursApi,
        setNeighboursApi,
        layers,
        setLayers,
        settlements,
        setSettlements,
        streets,
        setStreets,
        filter,
        setFilter,
        selectedFeatureId,
        setSelectedFeatureId,
        popups,
        setPopups,
      }}
    >
      <div className="tract-page">
        {loading && <Loading />}
        {/* <Popup /> */}
        <Side />
        <TractMap />
      </div>
    </TractPageContext.Provider>
  );
};

export default TractPage;

export { TractPageContext };
