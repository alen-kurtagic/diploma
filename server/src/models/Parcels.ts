import { Feature, FeatureCollection, GeoJsonProperties } from "geojson";
import { QueryResult, QueryResultRow } from "pg";
import { pool } from "../config/db";

const tableName = "parcels";

const getParcelsAsGeoJSON = (
  bbox: Array<number>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  const [minX, minY, maxX, maxY] = bbox;
  const query = `
    SELECT gid, ko_id, st_parcele, boniteta, ST_AsGeoJSON((ST_Dump(geom_4326)).geom)::json AS geometry
    FROM layers.${tableName}
    WHERE ST_Intersects(
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

  return new Promise<FeatureCollection<any, GeoJsonProperties>>(
    (resolve, reject) => {
      pool.query<QueryResultRow>(
        query,
        (error: Error, result: QueryResult<QueryResultRow>) => {
          if (error) {
            reject(error);
          } else {
            const features = result.rows.map(
              (row) =>
                ({
                  type: "Feature",
                  geometry: row.geometry,
                  properties: {
                    gid: row.gid,
                    ko_id: row.ko_id,
                    st_parcele: row.st_parcele,
                    boniteta: row.boniteta,
                  },
                } as Feature<any, GeoJsonProperties>)
            );

            const featureCollectionObject: FeatureCollection<any> = {
              type: "FeatureCollection",
              features: features,
            };

            resolve(featureCollectionObject);
          }
        }
      );
    }
  );
};

export { getParcelsAsGeoJSON };
