import { BBox } from "geojson";
import { sortBbox } from "src/utils/bbox";
import proj4 from "src/utils/projectionDefinitions";
import { transformPolygonCoordinates } from "src/utils/transformPolygon";

async function makeTransformedAPIRequest(
  apiEndpoint: string,
  originalBoundingBox: BBox
): Promise<GeoJSON.FeatureCollection> {
  const originalProjection: string = "EPSG:3857";
  const targetProjection: string = "EPSG:3794";

  // Transform the bounding box coordinates from the original projection to the target projection
  const transformedBoundingBox = transformBoundingBox(
    originalBoundingBox,
    originalProjection,
    targetProjection
  );

  // Make the API request with the transformed bounding box
  const response: GeoJSON.FeatureCollection = await makeAPIRequest(
    apiEndpoint,
    transformedBoundingBox
  );

  // Transform the response data coordinates back to the original projection
  const transformedData = transformResponseData(
    response,
    targetProjection,
    originalProjection
  );

  return transformedData;
}

function transformBoundingBox(
  originalBbox: BBox,
  sourceProjection: string,
  targetProjection: string
): BBox {
  // Convert the bounding box coordinates from the source projection to the target projection
  const transformedFirst = proj4(sourceProjection, targetProjection, [
    originalBbox[0],
    originalBbox[1],
  ]);
  const transformedSecond = proj4(sourceProjection, targetProjection, [
    originalBbox[2],
    originalBbox[3],
  ]);

  const transformedBbox: BBox = [
    transformedFirst[0],
    transformedFirst[1],
    transformedSecond[0],
    transformedSecond[1],
  ];

  // Return the transformed and sorted bounding box coordinates
  const [minX, minY, maxX, maxY] = sortBbox(transformedBbox);

  return [minX - 10, minY - 10, maxX + 10, maxY + 10];
}

function transformResponseData(
  responseData: GeoJSON.FeatureCollection,
  sourceProjection: string,
  targetProjection: string
): GeoJSON.FeatureCollection {
  // Transform the response data coordinates from the target projection to the source projection
  const transformedFeatures = responseData.features.map((feature) => {
    feature.geometry = transformPolygonCoordinates(
      feature.geometry,
      sourceProjection,
      targetProjection
    );
    return feature;
  });

  responseData.features = transformedFeatures;

  return responseData;
}

async function makeAPIRequest(
  apiEndpoint: string,
  bbox: BBox
): Promise<GeoJSON.FeatureCollection> {
  // Make the API request using the provided endpoint and bounding box
  //   const params = new URLSearchParams({
  //     bbox: bbox.join(","),
  //   });

  const url = `${apiEndpoint}?bbox=${bbox.join(",")}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
}

export { makeTransformedAPIRequest };
