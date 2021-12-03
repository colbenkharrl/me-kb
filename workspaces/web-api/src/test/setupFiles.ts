import dotenv from "dotenv";
import path from "path";

import { logEvent } from "../util/logEvent";

// source the test environment from the monorepo root
const testEnvPath = path.resolve(process.cwd(), "..", "..", ".test.env");
logEvent(`Sourcing test environment (${testEnvPath}).`, "test", "info");
dotenv.config({
  path: testEnvPath,
});
