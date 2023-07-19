import { pool } from "../connection";
import { Feature, FeatureCollection, GeoJsonProperties } from "geojson";
import { QueryResult, QueryResultRow } from "pg";
import { Client } from "pg";
import JSONStream from "jsonstream";
import QueryStream from "pg-query-stream";

const parcelsTableName = "data.parcels";
const landusesTableName = "data.landuses";
const settlementTableName = "codebook.settlement";
const landuseTableName = "codebook.landuse";

const getByBbox = async (
  bbox: Array<number>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  const [minX, minY, maxX, maxY] = bbox;

  const query = `
    SELECT parcel_id, quality, ST_AsGeoJSON((ST_Dump(geom_4326)).geom)::json AS geometry
    FROM ${parcelsTableName}
    WHERE 
    ST_Intersects(
      geom_4326, 
      ST_MakeEnvelope(
        ${minX}, 
        ${minY}, 
        ${maxX}, 
        ${maxY}, 
        4326
      )
    ) 
  `;

  return executeQuery(query);
};

const getByIds = async (
  ids: Array<string>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  const query = `
  WITH parcels_data AS (
    SELECT 
    parcels.parcel_id,
    parcels.quality, 
    settlement.settlement,
    landuses.share, 
    landuse.landuse, 
    landuse.code,
    ST_AsGeoJSON((ST_Dump(geom_4326)).geom)::json AS geometry
    FROM ${parcelsTableName}
    LEFT JOIN ${settlementTableName} USING (settlement_id)
    LEFT JOIN ${landusesTableName} USING (parcel_id)
    LEFT JOIN ${landuseTableName} USING (landuse_id)
    WHERE parcel_id IN ('${ids.join("', '")}')
  ),
  aggregated_landuse AS (
    SELECT parcel_id, json_agg(json_build_object('landuse', landuse, 'share', share, 'code', code)) as landuse_summary
    FROM parcels_data
    GROUP BY parcel_id
  )
  SELECT DISTINCT ON (parcel_id) *
  FROM parcels_data
  INNER JOIN aggregated_landuse USING (parcel_id);
  `;

  return executeQuery(query);
};

const executeQuery = async (
  query: string
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  // Create a new client instance
  const client = new Client();
  await client.connect();

  // Create a query stream
  const queryStream = new QueryStream(query);
  const stream = client.query(queryStream);

  // Pipe the query stream into JSONStream for parsing
  const jsonStream = stream.pipe(JSONStream.parse("*"));

  return new Promise<FeatureCollection<any, GeoJsonProperties>>(
    (resolve, reject) => {
      const features: any = [];

      jsonStream.on("data", (row: any) => {
        features.push({
          type: "Feature",
          geometry: row.geometry,
          properties: {
            parcel_id: row.parcel_id,
            quality: row.quality,
            settlement: row.settlement,
            landuse: row.landuse_summary,
          },
        });
      });

      jsonStream.on("end", () => {
        const featureCollectionObject: FeatureCollection<any> = {
          type: "FeatureCollection",
          features: features,
        };
        resolve(featureCollectionObject);

        // Don't forget to end your client connection
        client.end();
      });

      jsonStream.on("error", (err: any) => {
        reject(err);

        // Don't forget to end your client connection
        client.end();
      });
    }
  );
};

export { getByBbox, getByIds, parcelsTableName };
