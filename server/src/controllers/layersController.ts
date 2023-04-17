import { Request, Response } from "express";
import { formatBbox } from "../utils/geoUtils";
import { getParcelsAsGeoJSON } from "../models/Parcels";
import { FeatureCollection, GeoJsonProperties } from "geojson";

const LAYER_TYPE: { PARCELS: string } = {
  PARCELS: "parcels",
};

const getLayer = async (req: Request, res: Response, layer: string) => {
  const query = req.query;

  if (!query.bbox) {
    console.log("Inappropriate request (missing bbox)");
    return;
  }

  const bboxParameter = query.bbox.toString();
  const bbox = formatBbox(bboxParameter);

  if (layer == LAYER_TYPE.PARCELS) {
    const parcels: FeatureCollection<any, GeoJsonProperties> = await getParcels(
      bbox
    );
    res.send(JSON.stringify(parcels));
  }
  console.log("ended request");
};

const getParcels = async (
  bbox: Array<number>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  const parcelsGeoJSON: FeatureCollection<any, GeoJsonProperties> =
    await getParcelsAsGeoJSON(bbox);
  return parcelsGeoJSON;
};

export { LAYER_TYPE, getLayer };
