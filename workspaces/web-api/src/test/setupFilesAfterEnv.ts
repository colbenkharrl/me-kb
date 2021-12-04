/**
 * This file is configured to run after all test suites have completed. Read
 * more about this file here:
 * https://jestjs.io/docs/configuration#setupfilesafterenv-array
 */

import gql from "graphql-tag";
import { logEvent } from "../util/logEvent";
import { destroyDBConnection, GQLAPITest } from "./utils";

/**
 * We fire the logIn query before every test run to make test files easier to
 * write and understand.
 */
beforeAll(async () => {
  await GQLAPITest({
    query: gql`
      query LogInQuery($credentials: LoginInput!) {
        logIn(credentials: $credentials) {
          user {
            id
          }
          token
        }
      }
    `,
    variables: {
      credentials: {
        email: "test@me-kb.com",
        pw: "test12345",
      },
    },
    endHandler: (_err, res) => {
      expect(typeof res.body.data.logIn.token).toEqual("string");
    },
  });
});

/**
 * After a file has completed we destroy the database connection.
 */
afterAll(() => {
  logEvent("Tests completed, destroying DB connection.", "test", "info");
  destroyDBConnection();
});
