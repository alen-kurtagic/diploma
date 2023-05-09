import Navigation from "./components/Navigation/Navigation";
import TractMap from "./components/TractMap/TractMap";
import Loading from "src/components/Loading/Loading";
import { TractFetchData, TractPageState } from "src/types/types";
import { createContext, useRef, useState } from "react";
import { MapRef, ViewState } from "react-map-gl";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Taskbar from "./components/Taskbar/Taskbar";
import Categories from "./components/Categories/Categories";
import "./tract-page.sass";
import "bootstrap/dist/css/bootstrap.min.css";

export const TractPageContext = createContext<TractPageState>({
  viewState: {},
  handleViewState: (newViewState: Partial<ViewState>) => {},
  reactMapRef: null,
  ids: undefined,
  fetchedData: undefined,
  setFetchedData: (data: TractFetchData) => {},
  loading: true,
  setLoading: () => {},
});

function TractPage() {
  // Get "tract" parameter and pass it down to the TractMap
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idsParam = params.get("ids");
  const ids: Array<number> | undefined = idsParam?.split(",").map(Number);

  const [fetchedData, setFetchedData] = useState<TractFetchData>({
    tract: {
      geoJson: {
        type: "FeatureCollection",
        features: [],
      },
      settlementNames: [],
    },
  });

  const [loading, setLoading] = useState(true);

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
        fetchedData,
        setFetchedData,
        loading,
        setLoading,
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
