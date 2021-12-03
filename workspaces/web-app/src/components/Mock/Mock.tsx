import { FC, useMemo } from "react";
import { SchemaLink } from "@apollo/client/link/schema";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  Resolver,
} from "@apollo/client";

import { getMockedSchema } from "./getMockedSchema";

export type MockProps = {
  customResolvers?: Record<string, Resolver>;
};

export const Mock: FC<MockProps> = ({ children, customResolvers }) => {
  const client = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: new SchemaLink({ schema: getMockedSchema(customResolvers) }),
      }),
    [customResolvers]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
