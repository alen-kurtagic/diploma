import { ViewState } from "react-map-gl";

interface TractLayer {
  visibility: boolean;
  data: GeoJSON.FeatureCollection;
}

interface TractLayers {
  parcel: TractLayer;
  culture: TractLayer;
}

interface TractPageState {
  viewState: any;
  handleViewState: (newViewState: Partial<ViewState>) => void;
  reactMapRef: any;
  ids: Array<number> | undefined;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  layers: TractLayers;
  setLayers: (newLayers: TractLayers) => void;
  settlements: Array<string>;
  setSettlements: (newSettlements: Array<string>) => void;
}

export type { TractLayer, TractLayers, TractPageState };
