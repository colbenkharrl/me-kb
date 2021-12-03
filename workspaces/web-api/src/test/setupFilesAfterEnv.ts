/**
 * This file is configured to run after all test suites have completed. Read
 * more about this file here:
 * https://jestjs.io/docs/configuration#setupfilesafterenv-array
 */

import { logEvent } from "../util/logEvent";
import { destroyDBConnection } from "./utils";

/**
 * After a file has completed we destroy the database connection.
 */
afterAll(() => {
  logEvent("Tests completed, destroying DB connection.", "test", "info");
  destroyDBConnection();
});
