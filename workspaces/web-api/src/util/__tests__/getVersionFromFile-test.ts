import { getSupertestRequest } from "../../test/utils";

test("should fetch the version from the version endpoint", async () => {
  (await getSupertestRequest())
    .get("/version")
    .expect(200)
    .end(function (_err, res) {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.version).toEqual("test-version");
    });
});
