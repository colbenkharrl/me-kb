import { ApolloServer } from "apollo-server-express";
import express from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import { schema } from "./graphql";
import { logEvent } from "./util/logEvent";
// import { getKnex } from "./db/connection";
import { resolveUserFromContext } from "./auth/resolveUserFromContext";
import { ServerContext } from "./types";

type ServerInitConfig = {
  version: string;
};

/**
 * Server initializer for building both the top level express application and
 * middleware, as well as the Apollo GraphQL server for responding to GraphQL
 * API requests.
 * @param options ServerInitConfig
 * @returns Express App
 */
export const initServer = async ({ version }: ServerInitConfig) => {
  // create database connection client
  // logEvent(`Initializing database connection client.`, "startup");
  // const knex = getKnex();

  // initialize the apollo server
  logEvent(`Initializing ApolloServer application.`, "startup");
  const server = new ApolloServer({
    schema,
    formatError: (err) => {
      logEvent(err.message, "runtime", "error");
      return err;
    },
    context: async (context) => {
      const user = await resolveUserFromContext(context);

      const newContext: ServerContext = {
        ...context,
        // knex,
        user,
      };

      return newContext;
    },
  });

  // initialize express application
  logEvent(`Initializing Express application.`, "startup");
  const app = express();

  // for trusting local proxies
  app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

  // set up cookie middleware for auth sessions
  logEvent(`Initializing session cookie middleware.`, "startup");
  app.use(cookieParser());
  app.use(
    cookieSession({
      domain:
        process.env.NODE_ENV === "production" ? ".domain.com" : "localhost",
      name: "session-token",
      keys: [process.env.WEB_API_JWT_SECRET || "local-secret"],
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : undefined,
    })
  );

  // start the apollo server
  await server.start();

  // add ApolloServer to the Express application, including CORS middleware
  logEvent(`Adding ApolloServer to Express app middleware.`, "startup");
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
    },
  });

  /**
   * This is a development-only endpoint that we expose which renders a web page
   * that allows us to visually inspect the GraphQL schema in a graph-like
   * fashion. This is useful for viewing and exploring our data connections.
   *
   * View the web page at: http://localhost:4000/voyager
   */
  if (process.env.NODE_ENV === "development") {
    logEvent(`Adding voyager endpoint.`, "startup");
    app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));
  }

  /**
   * Endpoint to serve the version of the code (commit SHA) currently running on
   * this Hub Server instance.
   */
  app.get("/version", (_req, res) => {
    res.json({ version });
  });

  return {
    app,
    // knex,
  };
};
