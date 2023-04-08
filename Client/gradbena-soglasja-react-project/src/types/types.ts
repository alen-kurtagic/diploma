// An interface that defines the expected properties of the parameters for the

import { Dispatch, RefObject, SetStateAction } from "react";
import { MapRef, ViewState } from "react-map-gl";

// "goTo" function.
interface goToParams {
    box: [number, number, number, number];
    maxZoom: number;
    duration: number;
}

interface APISuggestion {
    id: number;
    ac_text: string;
    ac_group: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface AppState {
    viewState: any;
    handleViewState: (newViewState: Partial<ViewState>) => void;
    goToLocation: ({ location }: { location: APISuggestion }) => void;
    // reactMapRef: MapRef | null,
    reactMapRef: any,
    inputRef: RefObject<HTMLInputElement>;
    selectedFeatures: Array<any>;
    setSelectedFeatures: Dispatch<SetStateAction<any>>
    shiftPressed: RefObject<boolean>
  }

export type { goToParams, APISuggestion, AppState };

