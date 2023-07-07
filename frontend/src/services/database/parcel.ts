import { GeoJSONFeature } from "maplibre-gl";

const getParcelsByBBox = async (
  bbox: Array<number>
): Promise<GeoJSON.FeatureCollection> => {
  const url = `http://localhost:3000/data/parcels?bbox=${bbox.join(",")}`;
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const features = data.features.map((feature: GeoJSONFeature) => {
    return {
      ...feature,
      id: feature.properties.parcel_id,
    };
  });

  data.features = features;

  return data;
};

const getParcelsByIds = async (
  ids: Array<string>
): Promise<GeoJSON.FeatureCollection> => {
  const url = `http://localhost:3000/data/parcels?ids=${ids.join(",")}`;
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const features = data.features.map((feature: GeoJSONFeature) => {
    return {
      ...feature,
      id: feature.properties.parcel_id,
    };
  });

  data.features = features;

  return data;
};

export { getParcelsByBBox, getParcelsByIds };
