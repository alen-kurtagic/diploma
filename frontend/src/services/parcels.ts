import { APIParcel, APIParcels } from "src/types/types";

const getParcels = async (bbox: Array<number>): Promise<APIParcels> => {
  const url = `http://localhost:3000/layers/parcels?bbox=${bbox.join(",")}`;
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const features = data.features.map((feature: APIParcel) => {
    return {
      ...feature,
      id: feature.properties.gid,
    };
  });

  data.features = features;

  return data;
};

export { getParcels };
