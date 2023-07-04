import { area, intersect } from "@turf/turf";
import { featureEach } from "@turf/meta";

const calculateIntersectionPercentage = (
  featureCollection1: GeoJSON.FeatureCollection,
  featureCollection2: GeoJSON.FeatureCollection
): number => {
  let totalIntersectingArea = 0;
  let totalArea = 0;

  featureEach(featureCollection1, (feature1) => {
    if (feature1.geometry.type !== "Polygon") {
      throw new Error(
        "All features in featureCollection1 must be of type Polygon"
      );
    }

    const feature1Area = area(feature1);
    totalArea += feature1Area;

    featureEach(featureCollection2, (feature2) => {
      if (feature2.geometry.type !== "Polygon") {
        throw new Error(
          "All features in featureCollection2 must be of type Polygon"
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

// const calculateIntersectionPercentage = (polygon1: any, polygon2: any) => {
//   const intersectingPolygon = intersect(polygon1, polygon2);

//   if (!intersectingPolygon) {
//     // Polygons do not intersect
//     return 0;
//   }

//   const intersectingArea = area(intersectingPolygon);
//   const polygon1Area = area(polygon1);

//   const intersectionPercentage = (intersectingArea / polygon1Area) * 100;

//   return intersectionPercentage;
// };

export { calculateIntersectionPercentage };
