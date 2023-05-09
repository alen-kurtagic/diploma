import { APITract } from "src/types/types";

const getTract = async (ids: Array<number>): Promise<APITract> => {
  const url = `http://localhost:3000/tract?ids=${ids.join(",")}`;
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data: APITract = await response.json();
  const transformedFeatures = data.tract.geoJson.features.map((feature) => {
    return {
      ...feature,
      id: feature.properties!.gid,
    };
  });

  data.tract.geoJson.features = transformedFeatures;

  return data;
};

export { getTract };
