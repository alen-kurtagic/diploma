import { ViewState } from "react-map-gl";
import { Category } from "./permitEnums";

interface PermitLayer {
  category: Category;
  visibility: boolean;
  difficulty: number;
  data: GeoJSON.FeatureCollection;
}

interface TractPageState {
  viewState: any;
  handleViewState: (newViewState: Partial<ViewState>) => void;
  reactMapRef: any;
  ids: Array<number> | undefined;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  tract: GeoJSON.FeatureCollection;
  setTract: (tract: GeoJSON.FeatureCollection) => void;
  permitLayers: Array<PermitLayer>;
  setPermitLayers: (newPermitLayers: Array<PermitLayer>) => void;
  settlements: Array<string>;
  setSettlements: (newSettlements: Array<string>) => void;
  streets: Array<string>;
  setStreets: (newSettlements: Array<string>) => void;
  filter: string;
  setFilter: (newFilter: string) => void;
  selectedFeatureId: any;
  setSelectedFeatureId: (newSelectedFeatureId: any) => void;
}

export type { PermitLayer, TractPageState };
