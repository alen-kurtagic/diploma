import { getByBbox, getByIds } from "../database/models/Parcel";
import { FeatureCollection, GeoJsonProperties } from "geojson";

const getParcelsByBBox = async (bbox: Array<number>) => {
  try {
    const parcels: FeatureCollection<any, GeoJsonProperties> = await getByBbox(
      bbox
    );
    return parcels;
  } catch (error) {
    throw new Error(`Failed to fetch parcels by bbox`);
  }
};

const getParcelsByIds = async (
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

export { getParcelsByBBox, getParcelsByIds };
