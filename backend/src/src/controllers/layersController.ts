import { Request, Response } from "express";
import { getByBbox } from "../database/models/Parcel";
import { FeatureCollection, GeoJsonProperties } from "geojson";

const getParcels = async (bbox: Array<number>) => {
  try {
    const parcels: FeatureCollection<any, GeoJsonProperties> = await getByBbox(
      bbox
    );
    return parcels;
  } catch (error) {
    throw new Error(`Failed to fetch parcels by bbox`);
  }
};

export { getParcels };
