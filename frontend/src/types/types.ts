// An interface that defines the expected properties of the parameters for the

import { GeoJSONFeature } from "maplibre-gl";
import { Dispatch, RefObject, SetStateAction } from "react";
import { ViewState } from "react-map-gl";

// "goTo" function.
interface goToParams {
  box: [number, number, number, number];
  maxZoom: number;
  duration: number;
}

interface APISuggestion {
  id: number;
  cityName: string;
  locationName: string | null;
  ac_text: string;
  ac_group: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface HomePageState {
  viewState: any;
  handleViewState: (newViewState: Partial<ViewState>) => void;
  goToLocation: ({ location }: { location: APISuggestion }) => void;
  // reactMapRef: MapRef | null,
  reactMapRef: any;
  inputRef: RefObject<HTMLInputElement>;
  selectedFeatures: Array<any>;
  setSelectedFeatures: Dispatch<SetStateAction<any>>;
  shiftPressed: RefObject<boolean>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface TractPageState {
  viewState: any;
  handleViewState: (newViewState: Partial<ViewState>) => void;
  reactMapRef: any;
  tractIds: Array<number> | undefined;
  fetchedData: TractFetchData | undefined;
  setFetchedData: (data: TractFetchData) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface TractFetchData {
  geoJson: GeoJSON.FeatureCollection | undefined;
  settlement: Array<string>;
}

export type {
  goToParams,
  APISuggestion,
  HomePageState,
  TractPageState,
  TractFetchData,
};
