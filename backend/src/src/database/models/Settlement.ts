import { QueryResult, QueryResultRow } from "pg";
import { pool } from "../../config/db";

const tableName = "settlement";

const getByIds = async (ids: Array<number>): Promise<Array<string>> => {
  const idsCondition = `code = ANY('{${ids.join(",")}}'::int[]) `;

  const query = `
  SELECT name
  FROM codebook.${tableName}
  WHERE 
  ${idsCondition}
`;

  return new Promise<Array<string>>((resolve, reject) => {
    pool.query<QueryResultRow>(
      query,
      (error: Error, result: QueryResult<QueryResultRow>) => {
        if (error) {
          reject(error);
        } else {
          const municipalities: Array<string> = result.rows.map(
            (row) => row.name
          );
          resolve(municipalities);
        }
      }
    );
  });
};

export { getByIds };
