import gql from "graphql-tag";
import { GQLAPITest } from "../../../../../../test/utils";

it("should log in with valid credentials", async () => {
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
      expect(typeof res.body.data.logIn.user.id).toEqual("number");
      expect(typeof res.body.data.logIn.token).toEqual("string");
    },
  });
});

it("should fail to log in with invalid credentials", async () => {
  await GQLAPITest({
    query: gql`
      query LogInQuery($credentials: LoginInput!) {
        logIn(credentials: $credentials) {
          user {
            id
            name
            email
            created_utc
            updated_utc
            is_active
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
    statusCode: 400,
  });
});
