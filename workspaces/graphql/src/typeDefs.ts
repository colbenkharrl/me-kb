import gql from "graphql-tag";

// The GraphQL schema in string form
export const typeDefs = gql`
  type Query {
    greeting: Greeting
  }

  type Greeting {
    value: String
  }
`;
