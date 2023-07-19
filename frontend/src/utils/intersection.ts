import { area, intersect } from "@turf/turf";
import { featureEach } from "@turf/meta";

const isPolygonType = (geometryType: string): boolean => {
  return geometryType === "Polygon" || geometryType === "MultiPolygon";
};

const calculateIntersectionPercentage = (
  featureCollection1: GeoJSON.FeatureCollection,
  featureCollection2: GeoJSON.FeatureCollection
): number => {
  let totalIntersectingArea = 0;
  let totalArea = 0;

  featureEach(featureCollection1, (feature1) => {
    if (!isPolygonType(feature1.geometry.type)) {
      throw new Error(
        "All features in featureCollection1 must be of type Polygon or MultiPolygon"
      );
    }

    const feature1Area = area(feature1);
    totalArea += feature1Area;

    featureEach(featureCollection2, (feature2) => {
      if (!isPolygonType(feature2.geometry.type)) {
        throw new Error(
          "All features in featureCollection2 must be of type Polygon or MultiPolygon"
        );
      }

      const intersectingFeature = intersect(
        feature1 as GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>,
        feature2 as GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>
      );

      if (intersectingFeature) {
        const intersectingArea = area(intersectingFeature);
        totalIntersectingArea += intersectingArea;
      }
    });
  });

  const intersectionPercentage = (totalIntersectingArea / totalArea) * 100;

  return intersectionPercentage;
};

export { calculateIntersectionPercentage };
