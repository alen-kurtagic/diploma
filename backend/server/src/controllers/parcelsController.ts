import { getByBbox, getByIds } from "../database/models/Parcel";
import { FeatureCollection, GeoJsonProperties } from "geojson";

const getParcelsWithBBox = async (bbox: Array<number>) => {
  try {
    const parcels: FeatureCollection<any, GeoJsonProperties> = await getByBbox(
      bbox
    );
    return parcels;
  } catch (error: any) {
    throw new Error(`Failed to fetch parcels by BBox: ${error.message}`);
  }
};

const getParcelsWithId = async (
  ids: Array<string>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  try {
    const parcels: FeatureCollection<any, GeoJsonProperties> = await getByIds(
      ids
    );
    return parcels;
  } catch (error: any) {
    throw new Error(`Failed to fetch parcels by ids: ${error.message}`);
  }
};

export { getParcelsWithBBox, getParcelsWithId };
