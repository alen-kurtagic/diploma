import Navigation from "./components/Navigation/Navigation";
import TractMap from "./components/TractMap/TractMap";
import Loading from "src/components/Loading/Loading";
import { PermitLayer, TractPageState } from "src/types/tractTypes";
import { createContext, useEffect, useRef, useState } from "react";
import { MapRef, ViewState } from "react-map-gl";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tract-page.sass";
import Side from "./components/Side/Side";

export const TractPageContext = createContext<TractPageState>({
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
  permitLayers: [],
  setPermitLayers: () => {},
  settlements: [],
  setSettlements: () => {},
  streets: [],
  setStreets: () => {},
  filter: "",
  setFilter: () => {},
  selectedFeatureId: undefined,
  setSelectedFeatureId: () => {},
});

function TractPage() {
  // Get "tract" parameter and pass it down to the TractMap
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idsParam = params.get("ids");
  const ids: Array<string> | undefined = idsParam?.split(",");

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<string>("");

  const [tract, setTract] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const [permitLayers, setPermitLayers] = useState<Array<PermitLayer>>([]);

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

  const handleViewState = (newViewState: Partial<ViewState>) => {
    setViewState({ ...viewState, ...newViewState });
  };

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
        permitLayers,
        setPermitLayers,
        settlements,
        setSettlements,
        streets,
        setStreets,
        filter,
        setFilter,
        selectedFeatureId,
        setSelectedFeatureId,
      }}
    >
      <div className="tract-page">
        {loading && <Loading />}
        <Side />
        <TractMap />
      </div>
    </TractPageContext.Provider>
  );
}

export default TractPage;
