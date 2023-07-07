import { Pool } from "pg";
import { DB_CONFIG } from "../config/db";

const pool = new Pool(DB_CONFIG);

export { pool };
