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

type APIParcels = GeoJSON.FeatureCollection;

interface APISettlement {
  name: string;
}
export type { APISuggestion, APIParcels, APISettlement };
