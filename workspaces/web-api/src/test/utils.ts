import { DocumentNode } from "graphql";
import { Knex } from "knex";
import supertest, { SuperTest, Test } from "supertest";
import { initServer } from "../initServer";

// supertest request object singleton
let request: SuperTest<Test> | undefined;

let cookie: string;

// knex connection so we can kill it at the end of all test suites
let dbConnection: Knex<any, unknown[]> | undefined;

/**
 * Simple function to destroy the DB connection (via knex) for use at the end of
 * all test suites.
 */
export const destroyDBConnection = () => {
  if (dbConnection) {
    dbConnection.destroy();
  }
};

/**
 * Simple function to convert a GraphQL DocumentNode into a string that just
 * contains the GraphQL query / mutation. This lets us use the `gql` tags for
 * syntax highlighting and autoformatting, but then inject the strings into
 * API test bodies.
 * @param doc DocumentNode
 * @returns string
 */
export const getGQLString = (doc: any) => {
  return doc.loc && doc.loc.source.body;
};

/**
 * Simple getter for the supertest request object singleton which starts up the
 * API Server application with an optionally provided version.
 * @param version string
 * @returns Promise<SupertestRequest>
 */
export const getSupertestRequest = async (
  version = "test-version"
): Promise<SuperTest<Test>> => {
  if (!request) {
    const { app, knex } = await initServer({ version });
    request = supertest(app);
    dbConnection = knex;
  }
  return request;
};

// type containing options for a GQL API test
export type GqlAPITestOptions = {
  query: DocumentNode;
  variables?: Record<string, any>;
  contentTypeRegex?: RegExp;
  statusCode?: number;
  endHandler?: supertest.CallbackHandler;
};

/**
 * Abstraction function for composing GraphQL API tests which encapsulates the
 * usage of supertest and makes it simpler to write tests.
 * @param options GqlAPITestOptions
 */
export const GQLAPITest = async (options: GqlAPITestOptions) =>
  new Promise((resolve) => {
    getSupertestRequest().then((request) => {
      request
        .post("/graphql")
        .send({
          query: getGQLString(options.query),
          variables: options.variables,
        })
        .set("Accept", "application/json")
        .set("Cookie", cookie || "")
        .expect("Content-Type", options.contentTypeRegex || /json/)
        .expect(options.statusCode || 200)
        .end((err, res) => {
          const setCookies = res.header["set-cookie"];
          if (setCookies) {
            cookie = setCookies
              .map((c: string) => c.substring(0, c.indexOf(";")))
              .join("; ");
          }

          if (options.endHandler) {
            options.endHandler(err, res);
          }

          resolve(true);
        });
    });
  });
