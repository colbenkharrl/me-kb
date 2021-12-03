import gql from "graphql-tag";

export const QueryComponentQuery = gql`
  query QueryComponentQuery {
    greeting {
      value
    }
  }
`;
