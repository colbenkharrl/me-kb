import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "@me-kb/graphql";
import { resolvers } from "./types";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
