import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const uri = `${window.location.origin}/graphql`;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV === "development") {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        // Logging an error is ok, considering we don't (yet) have a logging framework.
        // eslint-disable-next-line no-console
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    // Logging an error is ok, considering we don't (yet) have a logging framework.
    // eslint-disable-next-line no-console
    if (networkError) console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri,
  credentials:
    process.env.NODE_ENV === "development" ? "include" : "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(httpLink),
});

export const getClient = () => client;
