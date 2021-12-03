import gql from "graphql-tag";
import { GQLAPITest } from "../../../../../../test/utils";

it("should return greeting", async () => {
  await GQLAPITest({
    query: gql`
      query GreetingQuery {
        greeting {
          value
        }
      }
    `,
    endHandler: (_err, res) => {
      expect(res.body.data.greeting.value).toEqual("Hello, world!");
    },
  });
});
