import dotenv from "dotenv";
dotenv.config({ debug: true, path: "./.env" });

const PORT = process.env.PORT || 3000;

const PGSQL_PORT = 5432;

const DB_CONFIG = {
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: "Werther1",
  port: PGSQL_PORT,
};

export { PORT, PGSQL_PORT, DB_CONFIG };
