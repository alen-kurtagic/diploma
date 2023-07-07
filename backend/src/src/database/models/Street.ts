import { QueryResult, QueryResultRow } from "pg";
import { pool } from "../connection";
import { parcelsTableName } from "./Parcel";

const streetsTableName = "data.streets";

const getStreetByIds = async (ids: Array<string>): Promise<Array<string>> => {
  const query = `
  SELECT 
    street, 
    ST_Distance(${streetsTableName}.geom_4326::geography, parcel.geom_4326::geography) AS distance
  FROM 
    ${streetsTableName}, 
    (
        SELECT 
        geom_4326 
        FROM ${parcelsTableName} 
        WHERE parcel_id IN ('${ids.join("', '")}')
    ) AS parcel 
    WHERE 
    ST_DWithin(${streetsTableName}.geom_4326::geometry, parcel.geom_4326::geometry, 0.0005) 
    ORDER BY distance ASC 
    LIMIT 4
  `;
  console.log(query);

  return new Promise<Array<string>>((resolve, reject) => {
    pool.query<QueryResultRow>(
      query,
      (error: Error, result: QueryResult<QueryResultRow>) => {
        if (error) {
          reject(error);
        } else {
          const street: Array<string> = result.rows.map((row) => row.street);
          resolve(street);
        }
      }
    );
  });
};

export { getStreetByIds };
