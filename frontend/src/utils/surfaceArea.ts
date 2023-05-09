import {
  Feature,
  FeatureCollection,
  Polygon,
  MultiPolygon,
  area,
} from "@turf/turf";

// Calculate the total surface area of all features
function calculateTotalSurfaceArea(
  featureCollection: GeoJSON.FeatureCollection
): number {
  let totalArea = 0;

  (featureCollection as FeatureCollection).features.forEach(
    (feature: Feature) => {
      const geometryType = feature.geometry.type;

      // Calculate the area based on the geometry type
      switch (geometryType) {
        case "Polygon":
          totalArea += area(feature.geometry as Polygon);
          break;
        case "MultiPolygon":
          totalArea += area(feature.geometry as MultiPolygon);
          break;
        case "GeometryCollection":
          // Handle other geometry types if needed
          break;
        // Add more cases for other geometry types as necessary
      }
    }
  );

  return totalArea;
}

export { calculateTotalSurfaceArea };
