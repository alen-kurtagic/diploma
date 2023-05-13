import Navigation from "./components/Navigation/Navigation";
import TractMap from "./components/TractMap/TractMap";
import Loading from "src/components/Loading/Loading";
import { TractLayers, TractPageState } from "src/types/tractTypes";
import { createContext, useRef, useState } from "react";
import { MapRef, ViewState } from "react-map-gl";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Taskbar from "./components/Taskbar/Taskbar";
import Categories from "./components/Categories/Categories";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tract-page.sass";

export const TractPageContext = createContext<TractPageState>({
  viewState: {},
  handleViewState: (newViewState: Partial<ViewState>) => {},
  reactMapRef: null,
  ids: undefined,
  loading: true,
  setLoading: () => {},
  layers: {
    parcel: {
      visibility: true,
      data: {
        type: "FeatureCollection",
        features: [],
      },
    },
    culture: {
      visibility: true,
      data: {
        type: "FeatureCollection",
        features: [],
      },
    },
  },
  setLayers: () => {},
  settlements: [],
  setSettlements: () => {},
});

function TractPage() {
  // Get "tract" parameter and pass it down to the TractMap
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idsParam = params.get("ids");
  const ids: Array<number> | undefined = idsParam?.split(",").map(Number);

  const [loading, setLoading] = useState(true);

  const [layers, setLayers] = useState<TractLayers>({
    parcel: {
      visibility: true,
      data: {
        type: "FeatureCollection",
        features: [],
      },
    },
    culture: {
      visibility: true,
      data: {
        type: "FeatureCollection",
        features: [],
      },
    },
  });

  const [settlements, setSettlements] = useState<Array<string>>([]);

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
        layers,
        setLayers,
        settlements,
        setSettlements,
      }}
    >
      <div className="tract-page">
        {loading && <Loading />}
        <Navigation />
        <TractMap />
        {!loading && (
          <>
            <Taskbar />
            <Header />
            <Categories />
          </>
        )}
      </div>
    </TractPageContext.Provider>
  );
}

export default TractPage;
