import { Geometry } from "geojson";
import proj4 from "src/utils/projectionDefinitions";

const transformPolygonCoordinates = (
  polygon: any,
  sourceProjection: string,
  targetProjection: string
): Geometry => {
  const transformedPolygon: Geometry = {
    type: "Polygon",
    coordinates: polygon.coordinates.map((ring: any) =>
      ring.map((coordinate: any) =>
        proj4(sourceProjection, targetProjection, coordinate)
      )
    ),
  };

  return transformedPolygon;
};

export { transformPolygonCoordinates };
