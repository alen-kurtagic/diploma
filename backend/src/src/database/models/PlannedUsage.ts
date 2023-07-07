import { QueryResult, QueryResultRow } from "pg";
import { pool } from "../connection";

const tableName = "planned_usage";

const getPlannedUsageByIds = async (
  ids: Array<number>
): Promise<Array<Array<string | number>>> => {
  const idsCondition = `eid_parcela = ANY('{${ids.join(",")}}'::int[]) `;

  const query = `
  SELECT opis_sl, delez 
  FROM layers.${tableName} JOIN usage ON (vrsta_namenske_rabe_id = podrobna_namenska_raba)
  WHERE 
  ${idsCondition}
`;

  return new Promise<Array<Array<string | number>>>((resolve, reject) => {
    pool.query<QueryResultRow>(
      query,
      (error: Error, result: QueryResult<QueryResultRow>) => {
        if (error) {
          reject(error);
        } else {
          const municipalities: Array<Array<string | number>> = result.rows.map(
            (row) => [row.vrsta_namenske_rabe_id, row.delez]
          );
          resolve(municipalities);
        }
      }
    );
  });
};

export { getPlannedUsageByIds };
