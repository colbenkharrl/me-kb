import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { typeDefs } from "@me-kb/graphql";
import { mergeResolvers } from "./mergeResolver";
import { Resolver } from "@apollo/client";

const schema = makeExecutableSchema({ typeDefs });

const globalMocks: Record<string, Resolver> = {
  Int: () => 1,
  Float: () => 1.5,
  String: (_source, _args, _context, _info) => _info?.field.name,
  Boolean: () => false,
  Greeting: () => ({ value: "Hello, world!" }),
};

export const getMockedSchema = (customResolvers?: Record<string, Resolver>) => {
  const mocks = customResolvers
    ? mergeResolvers(globalMocks, customResolvers)
    : globalMocks;
  return addMocksToSchema({ schema, mocks });
};
