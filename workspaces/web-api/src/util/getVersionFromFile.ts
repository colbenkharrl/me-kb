import path from "path";
import fs from "fs";

import { logEvent } from "./logEvent";

// the fallback string we will use if we can't get the version from file
const UNKNOWN_VERSION_STRING = "unknown";

/**
 * Function to read and return a version string from a file at the base of the
 * hub server project called 'version.txt'. If we run into issues, we return a
 * fallback version string 'unknown'.
 * @returns version (string)
 */
export const getVersionFromFile = async () => {
  try {
    // get the path to the version text file
    const versionFilePath = path.join(__dirname, "version.txt");

    // make sure the file exists before we try to operate on it
    if (fs.existsSync(versionFilePath)) {
      // read the contents of the file
      const versionBuffer = await fs.promises.readFile(versionFilePath);

      // convert the buffer to a string and trim whitespace + return chars
      const version = versionBuffer.toString("utf8").trim();

      // log the version we found for use in troubleshooting
      logEvent(`Loaded version from file: ${version}`, "startup", "info");

      return version;
    } else {
      // throw an error letting the user know that the file wasn't there
      throw new Error(
        `No 'version.txt' file found, defaulting to '${UNKNOWN_VERSION_STRING}' for the version endpoint.`
      );
    }
  } catch (error: any) {
    // catch and log errors, then return the fallback string
    logEvent(error?.message || "Failed to get version.", "startup", "warning");

    return UNKNOWN_VERSION_STRING;
  }
};
