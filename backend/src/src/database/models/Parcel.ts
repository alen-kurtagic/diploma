import { pool } from "../connection";
import { Feature, FeatureCollection, GeoJsonProperties } from "geojson";
import { QueryResult, QueryResultRow } from "pg";

const tableName = "kn_slo_parcele_slo_20230423";

const getByBbox = async (
  bbox: Array<number>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  const [minX, minY, maxX, maxY] = bbox;
  const bboxCondition = `ST_Intersects(
      geom_4326, 
      ST_MakeEnvelope(
        ${minX}, 
        ${minY}, 
        ${maxX}, 
        ${maxY}, 
        4326
      )
    ) `;

  const query = `
    SELECT gid, st_parcele, boniteta, ST_AsGeoJSON((ST_Dump(geom_4326)).geom)::json AS geometry
    FROM layers.${tableName}
    WHERE 
    ${bboxCondition}
  `;

  return executeQuery(query);
};

const getByIds = async (
  ids: Array<number>
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
  const query = `

  WITH test AS (
    SELECT 
      eid_parcel, 
      gid, 
      ko_id, 
      st_parcele, 
      boniteta, 
      settlement, 
      opis_sl, 
      delez, 
      sifra,
      ST_AsGeoJSON((ST_Dump(geom_4326)).geom)::json AS geometry
    FROM layers.${tableName}
    LEFT JOIN codebook.settlement ON (ko_id = code)
    LEFT JOIN layers.planned_usage USING (eid_parcel)
    LEFT JOIN codebook.usage ON (vrsta_namenske_rabe_id = raba_id)
    WHERE gid IN (${ids.join(",")})
  ),
  planned_usage_agg AS (
    SELECT eid_parcel, json_agg(json_build_object('opis_sl', opis_sl, 'delez', delez, 'sifra', sifra)) as planned_usage
    FROM test
    GROUP BY eid_parcel
  )
  SELECT DISTINCT ON (eid_parcel) *
  FROM test t
  INNER JOIN planned_usage_agg pua USING (eid_parcel);
  `;

  console.log(query);
  return executeQuery(query);
};

const executeQuery = async (
  query: string
): Promise<FeatureCollection<any, GeoJsonProperties>> => {
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
                    eid_parcela: row.eid_parcela,
                    gid: row.gid,
                    settlement: row.settlement,
                    ko: row.ko,
                    st_parcele: row.st_parcele,
                    boniteta: row.boniteta,
                    usage: row.planned_usage,
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

export { getByBbox, getByIds, tableName };
