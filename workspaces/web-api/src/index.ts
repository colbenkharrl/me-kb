import { initServer } from "./initServer";
import { getVersionFromFile } from "./util/getVersionFromFile";
import { logEvent } from "./util/logEvent";

logEvent("Initializing Web API.", "startup");

// get the version from version.txt for use in the version endpoint
getVersionFromFile()
  .then((version: string) => initServer({ version }))
  .then(({ app }) => {
    const port = process.env.PORT || 4000;
    logEvent(`Starting web api on port ${port}.`, "startup");
    app.listen({ port }, () => {
      logEvent(`Web api initialized and listening on port ${port}.`, "startup");
    });
  })
  .catch((err: Error) => logEvent(err.message, "startup", "error"));
