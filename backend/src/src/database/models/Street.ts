import { QueryResult, QueryResultRow } from "pg";
import { pool } from "../connection";
import { tableName as parcelTableName } from "./Parcel";

const tableName = "streets";

const getStreetByIds = async (ids: Array<number>): Promise<Array<string>> => {
  const query = `
  SELECT naziv, ST_Distance(layers.${tableName}.geom_4326::geography, parcel.geom_4326::geography) AS distance
  FROM layers.${tableName}, (SELECT geom_4326 FROM layers.${parcelTableName} WHERE gid = ANY('{${ids.join(
    ","
  )}}'::int[])) AS parcel WHERE ST_DWithin(layers.${tableName}.geom_4326::geometry, parcel.geom_4326::geometry, 0.0005) ORDER BY distance ASC LIMIT 4
  `;

  return new Promise<Array<string>>((resolve, reject) => {
    pool.query<QueryResultRow>(
      query,
      (error: Error, result: QueryResult<QueryResultRow>) => {
        if (error) {
          reject(error);
        } else {
          const street: Array<string> = result.rows.map((row) => row.naziv);
          resolve(street);
        }
      }
    );
  });
};

export { getStreetByIds };
