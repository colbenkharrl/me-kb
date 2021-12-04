import { ExpressContext } from "apollo-server-express";
import { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";
import { Knex } from "knex";
import { UserRecord } from "./db/types";

export type ServerContext = ExpressContext & {
  knex: Knex<any, unknown[]>;
  user: UserRecord | undefined;
};

export type FieldResolverArgs = [
  source: any,
  args: Record<string, any>,
  context: ServerContext,
  info: GraphQLResolveInfo
];

export type FieldResolver = GraphQLFieldResolver<
  any,
  ServerContext,
  Record<string, any>
>;
