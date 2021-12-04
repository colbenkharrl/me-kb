import knex, { Knex } from "knex";

// local credentials
export const LOCAL_WEB_API_DB_URL = "localhost";
export const LOCAL_WEB_API_DB_USER = "postgres";
export const LOCAL_WEB_API_DB_PW = "local-password";
export const LOCAL_WEB_API_DB_NAME = "web-api";

let knexConnection: Knex<any, unknown[]> | null = null;

// deployed postgres database
const pgConnection = {
  client: "pg",
  connection: {
    host: process.env.WEB_API_DB_URL,
    user: process.env.WEB_API_DB_USER,
    password: process.env.WEB_API_DB_PW,
    database: process.env.WEB_API_DB_NAME,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

// local sqlite database
const sqliteConnection = {
  client: "sqlite3",
  connection: {
    filename: "./sqlite/dev.sqlite3",
  },
  migrations: {
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

// knex connection initializer
export const getKnex = () => {
  if (!knexConnection) {
    knexConnection = knex(
      process.env.NODE_ENV === "production" ? pgConnection : sqliteConnection
    );
  }

  return knexConnection;
};
