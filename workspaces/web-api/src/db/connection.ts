import knex, { Knex } from "knex";

// local credentials
export const LOCAL_WEB_API_DB_URL = "localhost";
export const LOCAL_WEB_API_DB_USER = "postgres";
export const LOCAL_WEB_API_DB_PW = "local-password";
export const LOCAL_WEB_API_DB_NAME = "web-api";

// database connection credentials
export const connection = {
  host: process.env.WEB_API_DB_URL,
  user: process.env.WEB_API_DB_USER,
  password: process.env.WEB_API_DB_PW,
  database: process.env.WEB_API_DB_NAME,
};

let knexConnection: Knex<any, unknown[]> | null = null;

// knex connection initializer
export const getKnex = () => {
  if (!knexConnection) {
    knexConnection = knex({
      client: "pg",
      connection,
    });
  }

  return knexConnection;
};
