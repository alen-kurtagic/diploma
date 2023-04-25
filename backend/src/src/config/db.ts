import { Pool } from "pg";
import { DB_CONFIG } from "./index";

const pool = new Pool(DB_CONFIG);

export { pool };
