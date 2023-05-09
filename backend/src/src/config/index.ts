import dotenv from "dotenv";
dotenv.config({
  debug: true,
  path: "C:/University/Year 3/Term 2/Diplomsko delo/gradbena-soglasja/backend/.env",
});

const PORT = process.env.PORT || 3000;

const PGSQL_PORT = Number(process.env.PGSQL_PORT) || 5432;

const DB_CONFIG = {
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: PGSQL_PORT,
};

export { PORT, PGSQL_PORT, DB_CONFIG };
