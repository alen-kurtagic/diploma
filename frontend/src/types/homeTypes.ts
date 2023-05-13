import { Dispatch, RefObject, SetStateAction } from "react";
import { ViewState } from "react-map-gl";
import { APISuggestion } from "./apiTypes";

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

// "goTo" function.
interface goToParams {
  box: [number, number, number, number];
  maxZoom: number;
  duration: number;
}

export type { goToParams, HomePageState };
