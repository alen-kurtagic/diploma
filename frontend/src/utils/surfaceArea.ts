import {
  Feature,
  FeatureCollection,
  Polygon,
  MultiPolygon,
  area,
} from "@turf/turf";

// Calculate the total surface area of all features
function calculateArea(featureCollection: GeoJSON.FeatureCollection): number {
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

function formatArea(areaInSquareMeters: number) {
  const areaInSquareKilometers = areaInSquareMeters / 10000;
  const unit = areaInSquareKilometers < 0.1 ? "m²" : "ha";
  const area =
    areaInSquareKilometers < 0.1
      ? areaInSquareMeters.toFixed(0)
      : areaInSquareKilometers.toFixed(1);

  return {
    unit: unit,
    area: area.toString().replace(/^0+/, ""),
  };
}

export { calculateArea, formatArea };
