import { Request, Response } from "express";
import { getByIds } from "../database/models/Parcel";
import { FeatureCollection, GeoJsonProperties } from "geojson";

const getTract = async (
  ids: Array<number>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  try {
    const parcels: FeatureCollection<any, GeoJsonProperties> = await getByIds(
      ids
    );
    return parcels;
  } catch (error) {
    throw new Error(`Failed to fetch parcels by ids`);
  }
};

export { getTract };
