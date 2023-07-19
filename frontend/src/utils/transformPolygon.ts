import { Geometry, Polygon, MultiPolygon } from "geojson";
import proj4 from "src/utils/projectionDefinitions";

const transformCoordinates = (
  ring: any,
  sourceProjection: string,
  targetProjection: string
): number[][] => {
  return ring.map((coordinate: any) => {
    try {
      return proj4(sourceProjection, targetProjection, coordinate);
    } catch (err) {
      console.error("Error transforming coordinate:", err);
      console.log(coordinate);
      return coordinate; // Or return a default/fallback value
    }
  });
};

const transformPolygonCoordinates = (
  polygon: Geometry,
  sourceProjection: string,
  targetProjection: string
): Geometry => {
  let transformedPolygon: Geometry;

  if (polygon.type === "Polygon") {
    transformedPolygon = {
      type: "Polygon",
      coordinates: (polygon as Polygon).coordinates.map((ring) =>
        transformCoordinates(ring, sourceProjection, targetProjection)
      ),
    };
  } else if (polygon.type === "MultiPolygon") {
    transformedPolygon = {
      type: "MultiPolygon",
      coordinates: (polygon as MultiPolygon).coordinates.map((polygon) =>
        polygon.map((ring) =>
          transformCoordinates(ring, sourceProjection, targetProjection)
        )
      ),
    };
  } else {
    throw new Error("Invalid geometry type. Expected Polygon or MultiPolygon.");
  }

  return transformedPolygon;
};

export { transformPolygonCoordinates };
