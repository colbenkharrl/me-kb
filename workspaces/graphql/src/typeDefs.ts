import gql from "graphql-tag";

// The GraphQL schema in string form
export const typeDefs = gql`
  type Query {
    greeting: Greeting
    logIn(credentials: LoginInput!): LoginResult!
  }

  type Greeting {
    value: String
  }

  type LoginResult {
    user: User
    token: String
  }

  input LoginInput {
    email: String!
    pw: String!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    created_utc: Float!
    updated_utc: Float!
    is_active: Boolean!
  }
`;
